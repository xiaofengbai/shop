import nodemailer from "nodemailer";
import config from "../../../config/base";
import moment from "moment";
import { getCode } from "../../tool/common";

export const getCaptcha = async (ctx, next) => {
  const code = getCode();
  ctx.session.captcha = code;
  const res = await nodemailer.createTestAccount((err, account) => {
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
      to: "byf20222@163.com",
      // 邮件主题
      subject: "注册验证码",
      // 文字内容
      text: "",
      // html内容
      html: `<b>发送时间:${sendTime} </b><br/><b>验证码为:${code} </b>`
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
