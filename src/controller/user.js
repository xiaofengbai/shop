import { findUser, create } from "../service/user";
import { getMd5 } from "../tool/md5";

export const getUser = async (ctx, next) => {
  const { password, email } = ctx.body;
  const res = await findUser({ email });
  const parsePassword = getMd5(password);
  if (!res) {
    ctx.body = {
      success: false,
      msg: "用户名不存在"
    };
  } else if (res.password !== getMd5(password)) {
    ctx.body = {
      success: false,
      msg: "密码不正确"
    };
  } else if (res.password === getMd5(password)) {
    ctx.session.user = res;
    ctx.body = {
      success: true,
      userid: res._id,
      role: "admin"
    };
  }
};

export const getCurrentUser = async (ctx, next) => {
  const { user } = ctx.session;
  if (!user) {
    ctx.status = 401;
    return;
  } else {
    ctx.body = {
      success: true,
      data: { ...ctx.session.user }
    };
  }
};

export const registe = async (ctx, next) => {
  const { password, email, captcha } = ctx.body;
  const res = await findUser({ email });
  if (res) {
    ctx.body = {
      success: false,
      msg: "用户名已经存在"
    };
    return;
  }
  if (ctx.session.captcha !== captcha) {
    ctx.body = {
      success: false,
      msg: "验证码错误"
    };
    return;
  }

  ctx.session.captcha = null;

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
