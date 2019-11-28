const Router = require("koa-router");
import test from "../controller/test";
const router = Router({
  prefix: "/v1"
});
router.get("/", test.getTest);
router.get("/index1d", async function(ctx, next) {
  ctx.body = {
    title: "index1d"
  };
});
module.exports = router;
