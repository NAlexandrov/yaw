'use strict';

const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');

const router = require('./routes.js');
const logger = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/error.js');
const models = require('./middlewares/models.js');

const app = new Koa();

module.exports = (appCfg, log, tracer) => {
  app.use(logger(log, tracer));
  app.use(errorHandler);
  app.use(models);
  app.use(router.middleware());
  app.use(serve(path.join(__dirname, '..', 'public')));

  return app;
};
