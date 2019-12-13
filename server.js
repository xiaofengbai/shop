import Koa from "koa";
import router from "./src/router/index";
import config from "./config/base";
import db from "./config/mongo";
import koaBody from "koa-body";
import path from "path";
import cookies from "cookies";
import { get } from "lodash";
import session from "koa-session-minimal";
import Store from "./config/store";
import log4js from "./config/log4js";

const logger = log4js.getLogger();
const app = new Koa();

const logDir = path.join(__dirname, "logs");

app.use(
  session({
    key: "SESSION_ID",
    store: new Store(),
    cookie: {
      maxAge: 1000 * 60 * 10,
      expires: new Date("2020-12-12"),
      path: "/",
      httpOnly: false,
      overwrite: true
    }
  })
);

app.use(async (ctx, next) => {
  const start = new Date();
  if (config.server == "dev") {
    ctx.set("Access-Control-Allow-Origin", get(ctx, "request.header.origin"));
  }

  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  ctx.set("Access-Control-Allow-Headers", "Content-Type");
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Max-Age", 3600 * 24);
  if (ctx.method == "OPTIONS") {
    ctx.response.status = 204;
  } else {
    await next();
  }
  const ms = new Date() - start;
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
    logger.info(
      "connect",
      `server ${config.ip + ":" + config.port + " in " + config.server} created`
    );
  });
}
