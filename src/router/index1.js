const Router = require("koa-router");
import Test from "../controller/test";
import ValidateSchema from "../common/validateSchema";
import {
  testQuery,
  testQuery1,
  testQuery2,
  testQuery3
} from "../middleware/test";
const test = new Test();
const router = Router({
  prefix: "/v1"
});
router.get("/", ValidateSchema(testQuery), test.getTest);
router.post("/test1", ValidateSchema(testQuery3), test.getTest3);
router.post("/", ValidateSchema(testQuery1), test.postTest);
router.get("/:name", ValidateSchema(testQuery2), test.paramesTest);
router.get("/index1d", async function(ctx, next) {
  ctx.body = {
    title: "index1d"
  };
});
module.exports = router;
