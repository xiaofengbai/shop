import Koa from "koa";
import webpack from "webpack";
import router from "./router/index";
import config from "./config/base";
import db from "./config/mongo";
import koaBody from "koa-body";
import bodyParser from "koa-bodyparser";

const app = new Koa();
db.initBase();
app.use(bodyParser());
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
