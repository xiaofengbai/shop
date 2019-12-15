import { model as userModel } from "../model/user";

export const create = async param => {
  return new userModel(param).save();
};

export const findUser = async ({ email }, attathPassword) => {
  return userModel.findOne({ email });
};

export const findUserById = async id => {
  const res = await userModel
    .findOne({ _id: id }, { password: 0, updatedAt: 0, createdAt: 0 })
    .then(doc => doc);
  return res;
};

export const changeLoginState = async (id, isLogin) => {
  return await userModel.findOneAndUpdate({ _id: id }, { isLogin });
};
