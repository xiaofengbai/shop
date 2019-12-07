const Router = require("koa-router");
import ValidateSchema from "../common/validateSchema";
import { createAuthor } from "../middleware/author";
import { createAuthor as createControl } from "../controller/author";
const router = Router({
  prefix: "/v1"
});
router.post("/author", ValidateSchema(createAuthor), createControl);

module.exports = router;
