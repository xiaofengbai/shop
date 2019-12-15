import { Schema } from "mongoose";
import { conn } from "../connect/mongoDB";
import { schemaOptions } from "../connect/mongoooseSchema";

const collectionName = "users";

const schema = new Schema(
  {
    username: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    birth: {
      type: Date
    },
    email: {
      type: String,
      required: true
    },
    isLogin: {
      type: Boolean,
      default: false
    }
  },
  schemaOptions
);

export const model = conn.model(collectionName, schema, collectionName);
