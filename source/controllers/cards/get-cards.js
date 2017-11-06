'use strict';

module.exports = {
  handler: async (ctx) => {
    ctx.body = await ctx.cardsModel.getBy({
      userId: ctx.state.user.id,
    });
  },
};
