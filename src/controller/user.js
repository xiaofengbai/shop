import {
  findUser,
  create,
  findUserById,
  changeLoginState
} from "../service/user";
import { getMd5 } from "../tool/md5";
import store from "../tool/store";
import config from "../../config/base";

export const getUser = async (ctx, next) => {
  const { password, email } = ctx.body;
  const res = await findUser({ email }, true);
  const parsePassword = getMd5(password);
  if (!res) {
    ctx.body = {
      success: false,
      msg: "用户名不存在"
    };
  } else if (res.password !== parsePassword) {
    ctx.body = {
      success: false,
      msg: "密码不正确"
    };
  } else if (res.password === parsePassword) {
    ctx.session.userId = res._id;
    await changeLoginState(res._id, true);
    setTimeout(() => {
      changeLoginState(res._id, false);
    }, config.redis.ttl);
    ctx.body = {
      success: true,
      data: res._id
    };
  }
};

export const getCurrentUser = async (ctx, next) => {
  const { userId } = ctx.session;
  if (!userId) {
    ctx.status = 401;
    return;
  } else {
    ctx.body = {
      success: true,
      data: await findUserById(userId)
    };
  }
};

export const registe = async (ctx, next) => {
  const { password, email, captcha } = ctx.body;
  const res = await findUser({ email });
  const sessionCaptcha = await store.get(email);
  if (res) {
    ctx.body = {
      success: false,
      msg: "用户名已经存在"
    };
    return;
  }
  if (sessionCaptcha !== captcha) {
    ctx.body = {
      success: false,
      msg: "验证码错误"
    };
    return;
  }

  store.destroy(email);

  const result = await create({
    username: "",
    password: getMd5(password),
    email
  });
  ctx.body = {
    success: true,
    data: result._id
  };
};
