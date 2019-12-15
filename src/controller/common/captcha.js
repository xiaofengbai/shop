import nodemailer from "nodemailer";
import config from "../../../config/base";
import moment from "moment";
import { getCode } from "../../tool/common";
import store from "../../tool/store";

const REDIS_TIME = 1000 * 60 * 3; //验证码有效期

export const getCaptcha = async (ctx, next) => {
  const { email } = ctx.query;
  const sessionEmail = await store.get(email);
  const code = getCode();
  if (sessionEmail) {
    ctx.body = {
      success: false,
      msg: "您已经获取过验证码，等会儿再试"
    };
    return;
  }
  store.set(email, code, REDIS_TIME);

  await nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      host: config.email.qq.host,
      port: config.email.qq.port,
      secure: config.email.qq.secure,
      auth: {
        user: config.email.qq.auth.user,
        pass: config.email.qq.auth.password
      }
    });
    const sendTime = moment().format("MMMM Do YYYY, h:mm:ss a");

    const mailOptions = {
      // 发件人地址
      from: config.email.qq.auth.user,
      // 收件人列表, 向163邮箱, gmail邮箱, qq邮箱各发一封
      to: email,
      // 邮件主题
      subject: "注册验证码",
      // 文字内容
      text: "",
      // html内容
      html: `<b>发送时间:${sendTime} </b><br/><b>验证码为:${code} </b><br><b>有效期为${REDIS_TIME /
        1000}秒</b>`
    };
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("邮件发送成功~");
    });
  });

  ctx.body = {
    success: true
  };
};
