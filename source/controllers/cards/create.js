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
    body: {
      cardNumber: Joi.string().creditCard().required(),
      balance: Joi.number().required(),
    },
  },

  handler: async (ctx) => {
    const card = { userId: ctx.state.user.id, ...ctx.request.body };
    const newCard = await ctx.cardsModel.create(card);
    ctx.status = 201;
    ctx.body = newCard;
  },
};
