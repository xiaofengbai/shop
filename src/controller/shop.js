import shop from "../service/shop";

export default class Shop {
  async createShop(ctx, next) {
    const {
      name,
      total,
      remainder,
      belongsTo,
      price,
      config,
      honour,
      author
    } = ctx.body;
    const res = await shop.createShop({
      name,
      total,
      remainder,
      belongsTo,
      price,
      config,
      honour,
      author
    });
    ctx.body = {
      success: true,
      data: res
    };
  }
  async queryShop(ctx) {
    const { name, belongsTo, page, pageSize, sortBy, order, config } = ctx.body;
    const res = await shop.query({
      name,
      belongsTo,
      page,
      pageSize,
      sortBy,
      order,
      config
    });
    const count = await shop.queryCount({
      name,
      belongsTo,
      page,
      pageSize,
      sortBy,
      order
    });
    ctx.body = {
      success: true,
      data: res,
      total: count
    };
  }
  async getDetail(ctx) {
    const { id } = ctx.params;
    const res = await shop.getDetail({ id });
    ctx.body = {
      success: true,
      data: res
    };
  }
  async update(ctx) {
    const { id, name, total, remainder, belongsTo, price, config } = ctx.body;
    const res = await shop.update({
      id,
      name,
      total,
      remainder,
      belongsTo,
      price,
      config
    });
    ctx.body = {
      success: true,
      data: res
    };
  }
  async remove(ctx) {
    const { id } = ctx.params;
    const res = await shop.remove({ id });
    ctx.body = {
      success: true,
      data: res
    };
  }
}
