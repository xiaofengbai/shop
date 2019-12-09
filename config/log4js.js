import Koa from "koa";
import log4js from "koa-log4";
import logConfig from "./log4js.config";
import path from "path";

const logDir = path.join(__dirname, "logs");

try {
  require("fs").mkdirSync(logDir);
} catch (e) {
  if (e.code != "EEXIST") {
    console.error("Could not set up log directory, error was: ", e);
    process.exit(1);
  }
}

log4js.configure(logConfig, { cwd: logDir });

const logger = log4js.getLogger();

logger.info(`log4js config is runing`);

export default log4js;
