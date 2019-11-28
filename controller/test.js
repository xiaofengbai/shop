import test from "../service/test";
const getTest = async (ctx, next) => {
  const res = await test.testQuery();
  ctx.body = {
    data: res
  };
};
export default {
  getTest
};
