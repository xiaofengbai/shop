import Router from "koa-router";
import { getUser, getCurrentUser } from "../../controller/user";
import ValidateSchema from "../../common/validateSchema";
import { getUser as getUserVid } from "../../middleware/user";
const router = new Router();

router.post("/login/account", ValidateSchema(getUserVid), getUser);
router.get("/currentUser", getCurrentUser);

module.exports = router;
