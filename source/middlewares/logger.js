'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function logger(log) {
  return async function initLogger(ctx, next) {
    const start = process.hrtime();

    ctx.id = uuidv4();
    ctx.log = log.child({
      component: 'koa',
      req_id: ctx.id,
    });

    await next();

    const end = process.hrtime(start);
    const reqData = {
      method: ctx.method,
      url: ctx.url,
      status: ctx.status,
      responseTime: ((end[0] * 1e3) + (end[1] / 1000000)).toPrecision(3),
    };

    ctx.log.trace({ event: 'request_end', ...reqData });
  };
};
