import Koa from "koa";
import webpack from "webpack";
import router from "./src/router/index";
import config from "./config/base";
import db from "./config/mongo";
import koaBody from "koa-body";
import log4js from "koa-log4";
// import koaBody from "koa-bodyparser";

const app = new Koa();
const logger = log4js.getLogger("app");

app.use(log4js.koaLogger(log4js.getLogger("http"), { level: "auto" }));

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(2222, `${ctx.method} ${ctx.url} - ${ms}ms`);
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

db.initBase();
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 10240,
      uploadDir: "upload/"
      // onFileBegin: (name, file) => {
      //   // const fileFormat = file.name.split(".");
      //   // file.name = `${Date.now()}.${fileFormat[fileFormat.length - 1]}`;
      //   file.path = `upload/${file.name}`;
      // }
    }
  })
);
app.use(router.routes()).use(router.allowedMethods());

app.on("error", function(err, ctx) {
  console.error(11111, err);
  logger.error("server error", err, ctx);
});

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
    console.info(
      "connect",
      `server ${config.ip +
        ":" +
        config.port +
        " in " +
        process.env.SERVER} created`
    );
  });
}
