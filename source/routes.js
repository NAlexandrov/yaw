'use strict';

const router = require('koa-joi-router');
const { renderToStaticNodeStream } = require('react-dom/server');

const getCardsController = require('./controllers/cards/get-cards.js');
const createCardController = require('./controllers/cards/create.js');
const deleteCardController = require('./controllers/cards/delete.js');

const getTransactionsController = require('./controllers/transactions/get.js');
const createTransactionsController = require('./controllers/transactions/create.js');

const createPayController = require('./controllers/pay/create.js');

// const errorController = require('./controllers/error.js');
const indexView = require('./views/index.server.js');

const { Joi } = router;
const route = router();

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

route.get('/', async (ctx) => {
  const data = await getData(ctx);
  ctx.type = 'html';
  ctx.body = renderToStaticNodeStream(indexView(data));
});

route.get('/cards/', getCardsController);
route.post('/cards/', createCardController);
route.delete('/cards/:id', deleteCardController);

route.get('/cards/:id/transactions/', getTransactionsController);
route.post('/cards/:id/transactions/', createTransactionsController);

route.route({
  method: 'post',
  path: '/cards/:id/pay',
  validate: {
    type: 'json',
    body: {
      phoneNumber: Joi.string().required(),
      sum: Joi.number().required(),
    },
  },
  handler: createPayController,
});

// router.all('/error', errorController);

module.exports = route;
