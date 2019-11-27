const Router = require("koa-router");

const router = Router({
  prefix: "/v1"
});
router.get("/", async function(ctx, next) {
  ctx.body = {
    title: "koa2 title"
  };
});
router.get("/index1d", async function(ctx, next) {
  ctx.body = {
    title: "index1d"
  };
});
module.exports = router;
