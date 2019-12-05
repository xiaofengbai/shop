import { Schema } from "mongoose";
import { conn } from "../connect/mongoDB";
import { schemaOptions } from "../connect/mongoooseSchema";

const collectionName = "shopping";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    total: {
      type: Number
    },
    remainder: {
      type: String
    },
    belongsTo: {
      type: String
    },
    price: {
      type: Number
    }
  },
  schemaOptions
);

export const model = conn.model(collectionName, schema, collectionName);
