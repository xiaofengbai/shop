const ValidateSchema = function(schema) {
  return async (ctx, next) => {
    if (process.env.SERVER === "dev") {
      ctx.set("Access-Control-Allow-Origin", "*");
      ctx.set("Access-Control-Allow-Credentials", true);
    }
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
