'use strict';


const { Joi } = require('koa-joi-router');
const ApplicationError = require('../../../libs/application-error');

const allowedTypes = ['prepaidCard', 'paymentMobile', 'card2Card'];

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
      type: Joi.string().allow(allowedTypes).required(),
      sum: Joi.number().required(),
      data: Joi.string().required(),
      time: Joi.string().isoDate().default(() => (new Date()).toISOString(), 'time of transaction'),
    },
  },

  handler: async (ctx) => {
    const transaction = ctx.request.body;
    const cardId = ctx.params.id;

    const card = await ctx.cardsModel.getById(cardId);

    if (!card) {
      throw new ApplicationError(`No card with id ${cardId}`, 404);
    }

    transaction.cardId = cardId;

    const newTransaction = await ctx.transactionsModel.create(transaction);

    ctx.status = 201;
    ctx.body = newTransaction;
  },
};
