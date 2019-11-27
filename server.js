import Koa from "koa";
import webpack from "webpack";
import config from "./webpack.config.js";
import router from "./router/index";
const app = new Koa();

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
  app.listen(3001, () => {
    console.log("server run on 127.0.0.1:3001");
  });
}
