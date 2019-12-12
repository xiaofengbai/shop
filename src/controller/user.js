import { findUser } from "../service/user";

export const getUser = async (ctx, next) => {
  const { password, email } = ctx.body;
  const res = await findUser({ email });
  if (!res) {
    ctx.body = {
      success: false,
      msg: "用户名不存在"
    };
  } else if (res.password !== password) {
    console.log(22222, ctx.session.user);
    ctx.body = {
      success: false,
      msg: "密码不正确"
    };
  } else if (res.password === password) {
    console.log("密码正确");
    ctx.session.user = "qwwe";
    setInterval(() => {
      console.log(1111, ctx.session.user);
    }, 1000);
    // let token = ctx.session[email] = ;
    // res.token = token; // 更新mongo中对应用户名的token
    // try {
    //   await res.save(); // 更新mongo中对应用户名的token
    //   ctx.body = {
    //     code: 0,
    //     msg: "登录成功",
    //     username,
    //     token
    //   };
    // } catch (err) {
    //   ctx.body = {
    //     code: -1,
    //     msg: "登录失败，请重新登录"
    //   };
    // }
  }
};
