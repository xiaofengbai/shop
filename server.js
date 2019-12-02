import Koa from "koa";
import webpack from "webpack";
import router from "./src/router/index";
import config from "./config/base";
import db from "./config/mongo";
import koaBody from "koa-body";
// import koaBody from "koa-bodyparser";

const app = new Koa();
db.initBase();
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 10240,
      uploadDir: "upload/",
      // onFileBegin: (name, file) => {
      //   // const fileFormat = file.name.split(".");
      //   // file.name = `${Date.now()}.${fileFormat[fileFormat.length - 1]}`;
      //   file.path = `upload/${file.name}`;
      // }
    }
  })
);
app.use(router.routes()).use(router.allowedMethods());

if (process.argv[2] && process.argv[2][0] == "c") {
  const repl = require("repl");
  global.models = models;
  repl
    .start({
      prompt: "> ",
      useGlobal: true
    })
    .on("exit", () => {
      process.exit();
    });
} else {
  app.listen(config.port, config.ip, () => {
    console.log("connect", `server ${config.ip + ":" + config.port} created`);
  });
}
