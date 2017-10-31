'use strict';

module.exports = {
  handler: async (ctx) => {
    const cardId = Number(ctx.params.id);
    await ctx.cardsModel.remove(cardId);
    ctx.status = 200;
  },
};
