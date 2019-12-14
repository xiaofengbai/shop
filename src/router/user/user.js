import Router from "koa-router";
import { getUser, getCurrentUser, registe } from "../../controller/user";
import ValidateSchema from "../../common/validateSchema";
import { getUser as getUserVid, regestUser } from "../../middleware/user";
const router = Router();

router.post("/login/account", ValidateSchema(getUserVid), getUser);
router.post("/registe", ValidateSchema(regestUser), registe);
router.get("/currentUser", getCurrentUser);

module.exports = router;
