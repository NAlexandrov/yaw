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
      target: Joi.number().required(),
      sum: Joi.number().positive().required(),
    },
  },

  handler: async (ctx) => {
    const cardId = ctx.params.id;

    const operation = ctx.request.body;
    const { target, sum } = operation;

    await ctx.cardsModel.withdraw(cardId, sum);
    await ctx.cardsModel.refill(target, sum);

    const sourceCard = await ctx.cardsModel.getById(cardId);
    const targetCard = await ctx.cardsModel.getById(target);

    const transaction = await ctx.transactionsModel.create({
      cardId: sourceCard.id,
      type: 'withdrawCard',
      data: {
        cardNumber: targetCard.cardNumber,
      },
      time: new Date().toISOString(),
      sum,
    });

    await ctx.transactionsModel.create({
      cardId: targetCard.id,
      type: 'prepaidCard',
      data: {
        cardNumber: sourceCard.cardNumber,
      },
      time: new Date().toISOString(),
      sum,
    });

    ctx.status = 200;
    ctx.body = transaction;
  },
};
