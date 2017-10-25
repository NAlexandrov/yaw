'use strict';

const router = require('koa-router')();
const { renderToStaticNodeStream } = require('react-dom/server');

const getCardsController = require('./controllers/cards/get-cards.js');
const createCardController = require('./controllers/cards/create.js');
const deleteCardController = require('./controllers/cards/delete.js');

const getTransactionsController = require('./controllers/transactions/get.js');
const createTransactionsController = require('./controllers/transactions/create.js');

const createPayController = require('./controllers/pay/create.js');

const errorController = require('./controllers/error.js');
const indexView = require('./views/index.server.js');

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

router.get('/', async (ctx) => {
  const data = await getData(ctx);
  ctx.type = 'html';
  ctx.body = renderToStaticNodeStream(indexView(data));
});

router.get('/cards/', getCardsController);
router.post('/cards/', createCardController);
router.delete('/cards/:id', deleteCardController);

router.get('/cards/:id/transactions/', getTransactionsController);
router.post('/cards/:id/transactions/', createTransactionsController);

router.post('/cards/:id/pay', createPayController);

router.all('/error', errorController);

module.exports = router;
