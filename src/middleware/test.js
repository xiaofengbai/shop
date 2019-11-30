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

export { testQuery, testQuery1, testQuery2 };
