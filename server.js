import Koa from "koa";
import webpack from "webpack";
import router from "./src/router/index";
import config from "./config/base";
import db from "./config/mongo";
import koaBody from "koa-body";
import log4js from "koa-log4";
import serve from "koa-static";
import path from "path";
import { get } from "lodash";
const app = new Koa();
const logger = log4js.getLogger("app");

app.use(log4js.koaLogger(log4js.getLogger("http"), { level: "auto" }));

// app.use(serve(path.join(__dirname, "./dist")));

app.use(async (ctx, next) => {
  const start = new Date();
  if (config.server === "dev") {
    ctx.set("Access-Control-Allow-Origin", get(ctx, "request.header.origin"));
    ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    ctx.set("Access-Control-Allow-Headers", "Content-Type");
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.set("Access-Control-Max-Age", 3600 * 24);
  }
  if (ctx.method == "OPTIONS") {
    ctx.response.status = 204;
  } else {
    await next();
  }

  const ms = new Date() - start;
  console.log("[http]", `${ctx.method} ${ctx.url} - ${ms}ms`);
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
  console.error("[http]", err);
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
      `server ${config.ip + ":" + config.port + " in " + config.server} created`
    );
  });
}
