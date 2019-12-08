import mongodb from "../../config/mongo";
const ObjectId = require("mongodb").ObjectId;
import { dealFindParames } from "../tool/queryDeal";
import { model as shoppingModel } from "../model/shop";
import moment from "moment";
import { isEmpty } from "lodash";

const createShop = async parames => {
  return new shoppingModel(parames).save();
};

const query = async ({
  name,
  belongsTo,
  page = 1,
  pageSize = 0,
  sortBy,
  order,
  config = {}
}) => {
  const queryObj = dealFindParames({
    name: name ? new RegExp(name) : null,
    belongsTo
  });
  if (!isEmpty(config.publicationDate)) {
    queryObj["config.publicationDate"] = {
      $gt: new Date(config.publicationDate[0]),
      $lte: new Date(config.publicationDate[1])
    };
  }
  const sortObj = {};
  if (sortBy) {
    sortObj[sortBy] = order;
  }
  return await shoppingModel
    .find(queryObj)
    .sort(sortObj)
    .limit(Number(pageSize))
    .skip(Number((page - 1) * pageSize))
    .populate("author");
};

const queryCount = async ({ name, belongsTo }) => {
  const queryObj = dealFindParames({
    name: name ? new RegExp(`${name}`) : null,
    belongsTo
  });
  return await shoppingModel.find(queryObj).count();
};

const getDetail = async ({ id }) => {
  return shoppingModel.findOne({ _id: ObjectId(id) });
};

const update = async ({
  id,
  name,
  total,
  remainder,
  belongsTo,
  price,
  config
}) => {
  const mdObj = dealFindParames({
    name,
    total,
    remainder,
    belongsTo,
    price,
    config
  });
  return shoppingModel.findOne({ _id: ObjectId(id) }).update({
    $set: mdObj
  });
};
const remove = async ({ id }) => {
  return shoppingModel.remove({ _id: ObjectId(id) });
};
export default {
  createShop,
  query,
  queryCount,
  getDetail,
  update,
  remove
};
