'use strict';

const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const mongoose = require('mongoose');
const passport = require('koa-passport');
const route = require('koa-route');

const logger = require('../libs/logger.js');
const router = require('./routes.js');
const applyLogger = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/error.js');
const models = require('./middlewares/models.js');

const app = new Koa();

app.proxy = true;

mongoose.connect(process.env.DB, { useMongoClient: true });
mongoose.Promise = global.Promise;

const convert = require('koa-convert');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');

app.keys = [
  '5afe0eea0970460281e088e0cd73c85d',
  'aa6dd55eace04420a005db91323d90f2',
];

app.use(
  convert(
    session({
      store: new MongoStore({
        url: process.env.DB,
      }),
    }),
  ),
);

require('./auth');

app.use(passport.initialize());
app.use(passport.session());

app.use(route.get('/auth/yandex', passport.authenticate('yandex')));

app.use(
  route.get(
    '/auth/yandex/callback',
    passport.authenticate('yandex', {
      successRedirect: '/',
      failureRedirect: '/auth/failure',
    }),
  ),
);

app.use(route.get('/auth/google', passport.authenticate('google')));

app.use(
  route.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/auth/failure',
    }),
  ),
);

app.use(applyLogger(logger));
app.use(errorHandler);
app.use(models);
app.use(router.middleware());
app.use(serve(path.join(__dirname, '..', 'public')));

module.exports = app;
