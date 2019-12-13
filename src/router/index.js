const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const basename = path.basename(module.filename);
const config = require("../../config/base");

const router = Router({
  prefix: `/${config.prefix}`
});

function object2object(obj, maxDepth) {
  const object2objectfn = function(depth, data, key, obj, maxDepth) {
    let result = obj;
    if (depth > maxDepth) {
      return obj;
    }
    if (Object.prototype.toString.call(data) === "[object Array]") {
      for (let i = 0; i < data.length; i++) {
        let _key = key + "/" + i;
        if (
          !(
            Object.prototype.toString.call(data[i]) === "[object Array]" ||
            Object.prototype.toString.call(data[i]) === "[object Object]"
          )
        ) {
          obj[_key] = data[i];
        } else {
          object2objectfn(depth + 1, data[i], _key, obj, maxDepth);
        }
      }
    } else if (Object.prototype.toString.call(data) === "[object Object]") {
      for (let key1 in data) {
        let _key = key == "" ? key1 : key + "/" + key1;
        if (
          !(
            Object.prototype.toString.call(data[key1]) === "[object Array]" ||
            Object.prototype.toString.call(data[key1]) === "[object Object]"
          )
        ) {
          obj[_key] = data[key1];
        } else {
          object2objectfn(depth + 1, data[key1], _key, obj, maxDepth);
        }
      }
    }
    return result;
  };
  return object2objectfn(0, obj, "", {}, maxDepth || 5);
}

let pathDirObj = {};

function reader(dir, obj) {
  const dirs = fs.readdirSync(dir);
  for (let i = 0; i < dirs.length; i++) {
    const name = dirs[i];
    const curPath = path.resolve(dir, name);
    const exists = fs.existsSync(curPath);
    const stat = fs.statSync(curPath);
    if (exists && stat) {
      if (stat.isDirectory()) {
        if (!obj[name]) obj[name] = reader(path.resolve(dir, `./${name}`), {});
      } else if (stat.isFile()) {
        obj[name] = 1;
      }
    }
  }
  return obj;
}

const ws = object2object(reader(__dirname, pathDirObj));

Object.keys(ws)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    let route = require(path.join(__dirname, file));
    router.use(route.routes(), route.allowedMethods());
  });

export default router;
