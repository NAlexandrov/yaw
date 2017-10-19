'use strict';

const ApplicationError = require('../../libs/application-error.js');

module.exports = async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.log.error(err);
    ctx.status = err instanceof ApplicationError ? err.status : 500;
    ctx.body = {
      error: err.message,
    };
  }
};
