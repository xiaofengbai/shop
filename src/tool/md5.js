import crypto from "crypto";
import config from "../../config/base";

export const getMd5 = value => {
  const hmac = crypto.createHmac("sha256", config.md5Key);
  hmac.update(value);
  return hmac.digest("hex");
};
