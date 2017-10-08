'use strict';

const router = require('koa-router')();
const { renderToStaticMarkup } = require('react-dom/server');

const getCardsController = require('./controllers/cards/get-cards');
const createCardController = require('./controllers/cards/create');
const deleteCardController = require('./controllers/cards/delete');

const getTransactionsController = require('./controllers/transactions/get');
const createTransactionsController = require('./controllers/transactions/create');

const errorController = require('./controllers/error.js');
const indexView = require('./views/index.server.js');

const DATA = {
  user: {
    login: 'samuel_johnson',
    name: 'Samuel Johnson'
  }
};

router.get('/', (ctx) => {
  const indexViewHtml = renderToStaticMarkup(indexView(DATA));

  ctx.body = indexViewHtml;
});

router.get('/cards/', getCardsController);
router.post('/cards/', createCardController);
router.delete('/cards/:id', deleteCardController);

router.get('/cards/:id/transactions/', getTransactionsController);
router.post('/cards/:id/transactions/', createTransactionsController);

router.all('/error', errorController);

module.exports = router;
