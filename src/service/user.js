import { model as userModel } from "../model/user";
import moment from "moment";

export const create = async param => {
  return new userModel(param).save();
};

export const findUser = async ({ email }) => {
  return userModel.findOne({ email });
};
