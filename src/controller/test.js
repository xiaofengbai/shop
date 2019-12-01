import test from "../service/test";

export default class Test {
  async getTest(ctx, next) {
    const { name, age } = ctx.query;
    const res = await test.testQuery(name, age);
    ctx.body = {
      data: res
    };
  }
  async postTest(ctx, next) {
    const { name, age } = ctx.body;
    const res = await test.testQuery(name, age);
    ctx.body = {
      data: res
    };
  }
  async paramesTest(ctx, next) {
    const { name, age } = ctx.params;
    const res = await test.testQuery(name, age);
    ctx.body = {
      data: res
    };
  }
  async getTest3(ctx) {
    const { name, file } = ctx.body;
    console.log(name, file);
  }
}
