const Router = require("koa-router");
import ValidateSchema from "../common/validateSchema";
import {
  createShop,
  queryShop,
  getDetail,
  update,
  remove
} from "../middleware/shop";
import Shop from "../controller/shop";
const shop = new Shop();
const router = Router({
  prefix: "/v1/shop"
});
router.put("/create", ValidateSchema(createShop), shop.createShop);
router.post("/list", ValidateSchema(queryShop), shop.queryShop);
router.get("/detail/:id", ValidateSchema(getDetail), shop.getDetail);
router.post("/update", ValidateSchema(update), shop.update);
router.delete("/remove/:id", ValidateSchema(remove), shop.remove);

module.exports = router;
