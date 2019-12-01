import Joi from "@hapi/joi";
const testQuery = {
  query: Joi.object({
    name: Joi.string(),
    age: Joi.string().required()
  })
};

const testQuery1 = {
  body: Joi.object({
    name: Joi.string(),
    age: Joi.string().required()
  })
};
const testQuery2 = {
  params: Joi.object({
    name: Joi.string()
  })
};
const testQuery3 = {
  body: Joi.object({
    name: Joi.string(),
    file: Joi.any()
  })
};
export { testQuery, testQuery1, testQuery2, testQuery3 };
