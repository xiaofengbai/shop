var path = require("path");

module.exports = {
  ip: process.env.NODE_IP || "0.0.0.0",
  port: process.env.PORT || 3000,
  server: process.env.SERVER || "dev",
  rootPath: global.rootPath,
  serveStatic: true,
  db: {
    url: "mongodb://127.0.0.1:27017/cddb",
    options: {
      user: "",
      password: ""
    },
    baseDBName: "cddb"
  },
  redis: {
    host: "127.0.0.1",
    port: "6379",
    password: "ferg!!@#rt6u521343tfdqw",
    db: 0,
    ttl: 60 * 60 * 0.5,
    maxAge: 100000
  },
  prefix: "api"
};
