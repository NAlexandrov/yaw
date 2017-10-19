'use strict';

module.exports = async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.log.error(err);
    ctx.status = err.status ? err.status : 500;
    ctx.body = {
      error: err.message,
    };
  }
};
