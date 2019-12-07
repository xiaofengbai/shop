import Joi from "@hapi/joi";
const createShop = {
  body: Joi.object({
    name: Joi.string(),
    total: Joi.number(),
    remainder: Joi.number(),
    belongsTo: Joi.string(),
    price: Joi.number(),
    config: Joi.object(),
    honour: Joi.any(),
    author: Joi.string()
  })
};
const queryShop = {
  query: Joi.object({
    belongsTo: Joi.string(),
    name: Joi.string(),
    page: Joi.number()
      .min(1)
      .integer(),
    pageSize: Joi.number(),
    sortBy: Joi.string(),
    order: Joi.string()
  })
};
const getDetail = {
  params: Joi.object({
    id: Joi.string().required()
  })
};
const update = {
  body: Joi.object({
    id: Joi.string().required(),
    name: Joi.string(),
    total: Joi.number(),
    remainder: Joi.number(),
    belongsTo: Joi.string(),
    price: Joi.number()
  })
};
const remove = {
  params: Joi.object({
    id: Joi.string().required()
  })
};
export { createShop, queryShop, getDetail, update, remove };
