'use strict';

module.exports = {
  handler: async (ctx) => {
    ctx.body = await ctx.transactionsModel.getAll();
  },
};
