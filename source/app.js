'use strict';

const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const serve = require('koa-static');

const router = require('./routes.js');
const ApplicationError = require('../libs/application-error.js');
const CardsModel = require('./models/cards');
const TransactionsModel = require('./models/transactions');

const app = new Koa();

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error('Error detected', err);
    ctx.status = err instanceof ApplicationError ? err.status : 500;
    ctx.body = {
      error: err.message,
    };
  }
});

// Создадим модель Cards и Transactions на уровне приложения и проинициализируем ее
app.use(async (ctx, next) => {
  ctx.cardsModel = new CardsModel();
  ctx.transactionsModel = new TransactionsModel();

  await Promise.all([
    ctx.cardsModel.loadFile(),
    ctx.transactionsModel.loadFile(),
  ]);

  await next();
});

app.use(bodyParser);
app.use(router.routes());
app.use(serve(path.join(__dirname, '..', 'public')));

module.exports = app;
