import Joi from "@hapi/joi";

export const getUser = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};
