'use strict';

const { renderToStaticNodeStream } = require('react-dom/server');
const indexView = require('../views/index.server.js');

async function getData(ctx) {
  if (ctx.isAuthenticated()) {
    const cards = await ctx.cardsModel.getBy({
      userId: ctx.state.user.id,
    });

    const transactions = await ctx.transactionsModel.getBy({
      cardId: cards.map((v) => v.id),
    });

    return {
      user: ctx.state.user,
      cards,
      transactions,
    };
  }

  return {
    user: null,
    cards: [],
    transactions: [],
  };
}

module.exports = {
  handler: async (ctx) => {
    const data = await getData(ctx);
    ctx.type = 'html';
    ctx.body = renderToStaticNodeStream(indexView(data));
  },
};
