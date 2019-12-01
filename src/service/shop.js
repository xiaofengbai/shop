import mongodb from "../../config/mongo";
const ObjectId = require("mongodb").ObjectId;
import { dealFindParames } from "../tool/queryDeal";
import moment from "moment";
const createShop = async ({
  name = "",
  total = 0,
  remainder = 0,
  belongsTo = "",
  price = 0
}) => {
  const insertObj = {
    name,
    _createTime: moment().format(),
    total,
    remainder,
    belongsTo,
    price
  };
  mongodb
    .getDB()
    .collection("shopping")
    .insertOne(insertObj, (err, result) => {
      if (!err) {
        return result;
      }
    });
};
const query = async ({ name, belongsTo, page = 1, pageSize = 10 }) => {
  const queryObj = dealFindParames({
    name: name ? new RegExp(`${name}`) : null,
    belongsTo
  });
  return mongodb
    .getDB()
    .collection("shopping")
    .find(queryObj)
    .limit(Number(pageSize))
    .skip(Number(page - 1))
    .toArray();
};
const queryCount = async ({ name, belongsTo }) => {
  const queryObj = dealFindParames({
    name: name ? new RegExp(`${name}`) : null,
    belongsTo
  });
  return mongodb
    .getDB()
    .collection("shopping")
    .find(queryObj)
    .count();
};
const getDetail = async ({ id }) => {
  return mongodb
    .getDB()
    .collection("shopping")
    .findOne({ _id: ObjectId(id) });
};
const update = async ({ id, name, total, remainder, belongsTo, price }) => {
  const mdObj = dealFindParames({
    name,
    total,
    remainder,
    belongsTo,
    price
  });
  return mongodb
    .getDB()
    .collection("shopping")
    .updateOne(
      { _id: ObjectId(id) },
      {
        $set: mdObj
      }
    );
};
const remove = async({ id }) =>{
  return mongodb
    .getDB()
    .collection("shopping")
    .removeOne({ _id: ObjectId(id) });
}
export default {
  createShop,
  query,
  queryCount,
  getDetail,
  update,
  remove
};
