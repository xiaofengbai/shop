import mongoose from "mongoose";
import config from "../../config/base";
const NAME = config.db.baseDBName || "defaultDB";

mongoose.set("useCreateIndex", true);
export const conn = mongoose.createConnection(
  config.db.url,
  config.db.options || {
    poolSize: 5,
    useNewUrlParser: true
  }
);
// 链接错误
conn.on("error", error => {
  console.info("[mongoose] " + NAME + " has error");
  console.error(error);

  process.exit(1);
});
// 建立连接
conn.on("connected", () => {
  console.info("[mongoose] " + NAME + " connected");
});
// 重新连接
conn.on("reconnected", () => {
  console.info("[mongoose] " + NAME + " reconnected");
});
// 失去连接
conn.on("disconnected", () => {
  console.info("[mongoose] " + NAME + " disconnected");
});
