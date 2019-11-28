var path = require("path");

module.exports = {
  ip: process.env.NODE_IP || "127.0.0.1",
  port: process.env.PORT || 3030,

  rootPath: global.rootPath,
  db: {
    url: "mongodb://127.0.0.1:27017",
    options: {
      user: "",
      pass: ""
    },
    baseDBName: "cddb"
  }
};
