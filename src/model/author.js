import { Schema } from "mongoose";
import { conn } from "../connect/mongoDB";
import { schemaOptions } from "../connect/mongoooseSchema";

const collectionName = "author";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    birth: {
      type: Date
    },
    introduction: {
      type: String
    },
    works: {
      type: Object
    }
  },
  schemaOptions
);

export const model = conn.model(collectionName, schema, collectionName);
