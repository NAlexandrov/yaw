'use strict';

const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const router = require('koa-router')();
const serve = require('koa-static');

const app = new Koa();

router.get('/', (ctx) => {
  ctx.body = 'koa started';
});

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(bodyParser);
app.use(router.routes());
app.use(serve(path.join(__dirname, '..', 'public')));

module.exports = app;
