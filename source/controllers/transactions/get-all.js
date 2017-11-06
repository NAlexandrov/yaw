'use strict';

module.exports = {
  handler: async (ctx) => {
    ctx.body = await ctx.transactionsModel.getBy({
      userId: ctx.state.user.id,
    });
  },
};
