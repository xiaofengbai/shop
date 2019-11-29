import test from "../service/test";
const getTest = async (ctx, next) => {
  const { name, age } = ctx.query;
  const res = await test.testQuery(name, age);
  ctx.body = {
    data: res
  };
};
const postTest = async (ctx, next) => {
  const { name, age } = ctx.body;
  const res = await test.testQuery(name, age);
  ctx.body = {
    data: res
  };
};
const paramesTest = async (ctx, next) => {
  const { name, age } = ctx.params;
  const res = await test.testQuery(name, age);
  ctx.body = {
    data: res
  };
};
export default {
  getTest,
  paramesTest,
  postTest
};
