import Joi from "@hapi/joi";

export const getUser = {
  body: Joi.object({
    email: Joi.string()
      .trim()
      .email()
      .required(),
    password: Joi.string().required()
  })
};
export const regestUser = {
  body: Joi.object({
    email: Joi.string()
      .trim()
      .email()
      .required(),
    password: Joi.string().required(),
    captcha: Joi.string()
      .trim()
      .required()
  })
};
