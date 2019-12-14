var path = require("path");

module.exports = {
  ip: process.env.NODE_IP || "0.0.0.0",
  port: process.env.PORT || 3000,
  server: process.env.SERVER || "dev",
  rootPath: global.rootPath,
  serveStatic: true,
  md5Key: "1f32b9c9932c02227819a4151feed43e131aca40",
  db: {
    url: "mongodb://127.0.0.1:27017/cddb",
    options: {
      user: "",
      password: ""
    },
    baseDBName: "cddb"
  },
  redis: {
    host: "47.105.138.95",
    port: "6379",
    password: "ferg!!@#rt6u521343tfdqw",
    db: 0,
    ttl: 1000 * 60 * 30
  },
  cookie: {
    path: "/",
    httpOnly: false,
    overwrite: true
  },
  email: {
    qq: {
      host: "smtp.qq.com",
      port: "465",
      secure: true,
      auth: {
        user: "2878640192@qq.com",
        password: "phibpminuzpwdfae"
      }
    }
  },
  prefix: "api"
};
