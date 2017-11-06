'use strict';

const router = require('koa-joi-router')();

const indexController = require('./controllers/index.js');
const logoutController = require('./controllers/logout.js');
const getCardsController = require('./controllers/cards/get-cards.js');
const createCardController = require('./controllers/cards/create.js');
const deleteCardController = require('./controllers/cards/delete.js');
const getTransactionsController = require('./controllers/transactions/get.js');
const getAllTransactionsController = require('./controllers/transactions/get-all.js');
const createTransactionsController = require('./controllers/transactions/create.js');
const cardToMobile = require('./controllers/cards/card-to-mobile.js');
const cardToCard = require('./controllers/cards/card-to-card.js');
const mobileToCard = require('./controllers/cards/mobile-to-card.js');

const getTransactionsXLSX = require('./controllers/reports/xlsx.js');
const getTransactionsDOCX = require('./controllers/reports/docx.js');

/**
 * @see {@link https://github.com/koajs/joi-router} for more information
 * @type {Object[]} - Collection of routes
 * @prop {String} method - HTTP method like "get", "post", "put", etc
 * @prop {String} path - Path from URL
 * @prop {Function} handler - async function or function
 * @prop {Object} [meta] - meta data about this route
 */
const routes = [
  {
    method: 'get',
    path: '/',
    ...indexController,
  },
  {
    method: 'get',
    path: '/logout',
    ...logoutController,
  },
  {
    method: 'get',
    path: '/cards',
    ...getCardsController,
  },
  {
    method: 'post',
    path: '/cards',
    ...createCardController,
  },
  {
    method: 'delete',
    path: '/cards/:id',
    ...deleteCardController,
  },
  {
    method: 'get',
    path: '/cards/:id/transactions',
    ...getTransactionsController,
  },
  {
    method: 'post',
    path: '/cards/:id/transactions',
    ...createTransactionsController,
  },
  {
    method: 'post',
    path: '/cards/:id/pay',
    ...cardToMobile,
  },
  {
    method: 'post',
    path: '/cards/:id/transfer',
    ...cardToCard,
  },
  {
    method: 'post',
    path: '/cards/:id/fill',
    ...mobileToCard,
  },
  {
    method: 'get',
    path: '/transactions',
    ...getAllTransactionsController,
  },
  {
    method: 'get',
    path: '/reports/transactions.xlsx',
    ...getTransactionsXLSX,
  },
  {
    method: 'get',
    path: '/reports/transactions.docx',
    ...getTransactionsDOCX,
  },
];

router.route(routes);

module.exports = router;
