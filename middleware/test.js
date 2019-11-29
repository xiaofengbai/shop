import Joi from "@hapi/joi";

class ValidateSchemaData {
  constructor(ctx, next) {
    this.query = ctx.query;
    this.body = ctx.body;
    this.params = ctx.params;
  }
}

const ValidateSchema = function(schema) {
  return async (ctx, next) => {
    const key = Object.keys(schema)[0];
    let tempCtx = ctx;
    if (key === "body") {
      ctx.body = ctx.request.body;
    }
    try {
      await schema[key].validateAsync(ctx[key]);
    } catch (error) {
      ctx.body = {
        success: false,
        message: error.details[0].message
      };
      return;
    }
    await next(ctx);
  };
};

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

export { ValidateSchema, testQuery, testQuery1, testQuery2 };
