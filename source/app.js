'use strict';

const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const mongoose = require('mongoose');

const logger = require('../libs/logger.js');
const router = require('./routes.js');
const applyLogger = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/error.js');
const models = require('./middlewares/models.js');

const app = new Koa();

mongoose.connect(process.env.DB, { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(applyLogger(logger));
app.use(errorHandler);
app.use(models);
app.use(router.middleware());
app.use(serve(path.join(__dirname, '..', 'public')));

module.exports = app;
