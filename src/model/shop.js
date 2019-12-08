import { Schema } from "mongoose";
import { conn } from "../connect/mongoDB";
import { schemaOptions } from "../connect/mongoooseSchema";

const collectionName = "shopping";
const honour = new Schema(
  {
    title: {
      type: String
    }
  },
  { _id: true }
);

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
      type: Number
    },
    belongsTo: {
      type: String
    },
    price: {
      type: Number
    },
    config: {
      startDate: Date,
      endDate: Date,
      active: Boolean,
      author: String,
      publicationDate: Date
    },
    honour: {
      type: honour
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "author"
    }
  },
  schemaOptions
);

export const model = conn.model(collectionName, schema, collectionName);
