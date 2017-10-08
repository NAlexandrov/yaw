'use strict';

const router = require('koa-router')();
const getCardsController = require('./controllers/cards/get-cards');
const createCardController = require('./controllers/cards/create');
const deleteCardController = require('./controllers/cards/delete');
const errorController = require('./controllers/error.js');

router.get('/', (ctx) => {
  ctx.body = 'koa started';
});

router.get('/cards/', getCardsController);
router.post('/cards/', createCardController);
router.delete('/cards/:id', deleteCardController);

router.all('/error', errorController);

module.exports = router;
