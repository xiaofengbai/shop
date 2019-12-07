import { create } from "../service/author";

export const createAuthor = async (ctx, next) => {
  const { name, birth, introduction, works } = ctx.body;
  const res = await create({ name, birth, introduction, works });
  ctx.body = {
    success: true,
    data: res
  };
};
