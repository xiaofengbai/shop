import mongodb from "../../config/mongo";
const ObjectId = require("mongodb").ObjectId;
import { dealFindParames } from "../tool/queryDeal";
import { model as shoppingModel } from "../model/shop";
import moment from "moment";
const createShop = async ({
  name = "",
  total = 0,
  remainder = 0,
  belongsTo,
  price = 0
}) => {
  const insertObj = new shoppingModel({
    name,
    total,
    remainder,
    belongsTo,
    price
  });
  return insertObj.save();
};

const query = async ({ name, belongsTo, page = 1, pageSize = 10 }) => {
  const queryObj = dealFindParames({
    name: name ? new RegExp(`${name}`) : null,
    belongsTo
  });
  return await shoppingModel
    .find({ total: { $gte: 30 } })
    .limit(Number(pageSize))
    .skip(Number((page - 1) * pageSize));
};

const queryCount = async ({ name, belongsTo }) => {
  const queryObj = dealFindParames({
    name: name ? new RegExp(`${name}`) : null,
    belongsTo
  });
  return await shoppingModel.find({ total: { $gte: 30 } }).count();
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
const remove = async ({ id }) => {
  return mongodb
    .getDB()
    .collection("shopping")
    .removeOne({ _id: ObjectId(id) });
};
export default {
  createShop,
  query,
  queryCount,
  getDetail,
  update,
  remove
};
