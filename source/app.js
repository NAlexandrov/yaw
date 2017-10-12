'use strict';

const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const serve = require('koa-static');
const uuidv4 = require('uuid/v4');

const router = require('./routes.js');
const ApplicationError = require('../libs/application-error.js');
const CardsModel = require('./models/cards');
const TransactionsModel = require('./models/transactions');

const app = new Koa();

module.exports = (appCfg, log) => {
  // init logger with request id
  app.use(async (ctx, next) => {
    ctx.id = uuidv4();
    ctx.log = log.child({ req_id: ctx.id });
    await next();
  });

  // logger
  app.use(async (ctx, next) => {
    const start = process.hrtime();
    await next();
    const end = process.hrtime(start);
    ctx.log.trace({
      method: ctx.method,
      url: ctx.url,
      status: ctx.status,
      responseTime: ((end[0] * 1e3) + (end[1] / 1000000)).toPrecision(3),
    });
  });

  // error handler
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.log.error(err);
      ctx.status = err instanceof ApplicationError ? err.status : 500;
      ctx.body = {
        error: err.message,
      };
    }
  });

  // Создадим модель Cards и Transactions на уровне приложения и проинициализируем ее
  app.use(async (ctx, next) => {
    ctx.cardsModel = new CardsModel({
      logger: ctx.log,
    });

    ctx.transactionsModel = new TransactionsModel({
      logger: ctx.log,
    });

    await Promise.all([
      ctx.cardsModel.loadFile(),
      ctx.transactionsModel.loadFile(),
    ]);

    await next();
  });

  app.use(bodyParser);
  app.use(router.routes());
  app.use(serve(path.join(__dirname, '..', 'public')));

  return app;
};
