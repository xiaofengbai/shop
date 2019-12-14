import Joi from "@hapi/joi";

export const captchacd = {
  query: Joi.object({
    email: Joi.string().required()
  })
};
