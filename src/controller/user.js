import { findUser } from "../service/user";
import crypto from "crypto";
export const getUser = async (ctx, next) => {
  const { password, email } = ctx.body;
  const res = await findUser({ email });
  console.log(111, res);
  const md5 = crypto.createHash("md5");
  const trs = md5.update(password).digest("hex");
  console.log(11111, trs);
  if (!res) {
    ctx.body = {
      success: false,
      msg: "用户名不存在"
    };
  } else if (res.password !== password) {
    ctx.body = {
      success: false,
      msg: "密码不正确"
    };
  } else if (res.password === password) {
    ctx.session.user = res;
    ctx.body = {
      success: true,
      userid: res._id,
      currentAuthority: "admin",
      status: true
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
