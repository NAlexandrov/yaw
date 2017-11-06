'use strict';

const { renderToStaticNodeStream } = require('react-dom/server');
const indexView = require('../views/index.server.js');

async function getData(ctx) {
  const cards = await ctx.cardsModel.getAll();
  const transactions = await ctx.transactionsModel.getAll();

  return {
    user: ctx.isAuthenticated() ? ctx.state.user : null,
    cards,
    transactions,
  };
}

module.exports = {
  handler: async (ctx) => {
    const data = await getData(ctx);
    ctx.type = 'html';
    ctx.body = renderToStaticNodeStream(indexView(data));
  },
};
