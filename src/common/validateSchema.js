import config from "../../config/base";
const ValidateSchema = function(schema) {
  return async (ctx, next) => {
    const key = Object.keys(schema)[0];
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
export default ValidateSchema;
