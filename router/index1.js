const Router = require("koa-router");
import test from "../controller/test";
import {
  testQuery,
  testQuery1,
  testQuery2,
  ValidateSchema
} from "../middleware/test";
const router = Router({
  prefix: "/v1"
});
router.get("/", ValidateSchema(testQuery), test.getTest);
router.post("/", ValidateSchema(testQuery1), test.postTest);
router.get("/:name", ValidateSchema(testQuery2), test.paramesTest);
router.get("/index1d", async function(ctx, next) {
  ctx.body = {
    title: "index1d"
  };
});
module.exports = router;
