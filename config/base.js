var path = require("path");

module.exports = {
  ip: process.env.NODE_IP || "0.0.0.0",
  port: process.env.PORT || 3000,
  server: process.env.SERVER || "dev",
  rootPath: global.rootPath,
  db: {
    url: "mongodb://127.0.0.1:27017/cddb",
    options: {
      user: "",
      pass: ""
    },
    baseDBName: "cddb"
  }
};
