'use strict';

const Koa = require('koa');
const router = require('koa-joi-router');

const Phone = require('./phone.js');

const { Joi } = router;

const handlers = router();

handlers.route({
  method: 'get',
  path: '/:number',
  validate: {
    params: {
      number: Joi.number().positive().required(),
    },
  },
  handler: async (ctx) => {
    const phone = new Phone(ctx.params.number);
    const result = await phone.getOperator();
    ctx.body = result;
  },
});

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      error: err.message,
    };
  }
});

app.use(handlers.middleware());

const PORT = process.env.PHONE_SERVICE_PORT || 3334;

app.listen(PORT, 'localhost', () => {
  /* eslint no-console:0 max-len:0 */
  console.log(`Service phone started at port: ${PORT}. Environment: ${process.env.NODE_ENV}`);
});
