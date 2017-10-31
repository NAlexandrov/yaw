'use strict';

module.exports = {
  handler: async (ctx) => {
    const cardId = Number(ctx.params.id);
    ctx.body = await ctx.transactionsModel.getByCard(cardId);
  },
};
