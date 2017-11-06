'use strict';

const { Joi } = require('koa-joi-router');

module.exports = {
  /**
   * @see {@link https://github.com/koajs/joi-router} for more information
   * @prop {String} type - The type of payload
   * @prop {Object} [header] - Object which conforms to [Joi]{@link https://github.com/hapijs/joi} validation
   * @prop {Object} [query] - Object which conforms to [Joi]{@link https://github.com/hapijs/joi} validation
   * @prop {Object} [params] - Object which conforms to [Joi]{@link https://github.com/hapijs/joi} validation
   * @prop {Object} [body] - Object which conforms to [Joi]{@link https://github.com/hapijs/joi} validation
   * @prop {Object} [output] - Ouput validation {@link https://github.com/koajs/joi-router#validating-output}
   * @prop {Number} [maxBody] - Max incoming body size for forms or json input
   * @prop {Number} [failure=400] - HTTP response code to use when input validation fails
   * @prop {Boolean} [continueOnError] - Should continue processing the middleware stack if validation fails
   */
  validate: {
    type: 'json',
    params: {
      id: Joi.number().required(),
    },
    body: {
      phoneNumber: Joi.string().required(),
      sum: Joi.number().positive().required(),
    },
  },

  handler: async (ctx) => {
    const cardId = ctx.params.id;

    const operation = ctx.request.body;
    const { phoneNumber, sum } = operation;

    ctx.cardsModel.refill(cardId, sum);

    const transaction = await ctx.transactionsModel.create({
      cardId,
      type: 'paymentMobile',
      data: { phoneNumber },
      time: new Date().toISOString(),
      sum,
    });

    ctx.status = 200;
    ctx.body = transaction;
  },
};
