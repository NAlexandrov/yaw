'use strict';

const { renderToStaticNodeStream } = require('react-dom/server');
const indexView = require('../views/index.server.js');

async function getData(ctx) {
  const user = {
    login: 'samuel_johnson',
    name: 'Samuel Johnson',
  };

  const cards = await ctx.cardsModel.getAll();
  const transactions = await ctx.transactionsModel.getAll();

  return {
    user,
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
