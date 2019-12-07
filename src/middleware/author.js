import Joi from "@hapi/joi";
import { join } from "path";

export const createAuthor = {
  body: Joi.object({
    name: Joi.string().required(),
    birth: Joi.date(),
    introduction: Joi.string(),
    works: Joi.any()
  })
};
