import { model as authorModel } from "../model/author";
import moment from "moment";
export const create = async param => {
  return new authorModel(param).save();
};
