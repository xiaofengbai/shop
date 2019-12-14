import Router from "koa-router";
import { getCaptcha } from "../../controller/common/captcha";
import ValidateSchema from "../../common/validateSchema";
import { captchacd } from "../../middleware/common/captcha";
const router = Router();

router.get("/captcha", ValidateSchema(captchacd), getCaptcha);

module.exports = router;
