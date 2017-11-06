'use strict';

const request = require('request');
const moment = require('moment');
const { Joi } = require('koa-joi-router');

const renderPaymentType = require('../../../libs/render-payment-type.js');

moment.locale('ru');

// http://localhost:8000/reports/transactions.xlsx

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
    params: {
      id: Joi.number().required(),
    },
  },

  handler: async (ctx) => {
    const transacations = await ctx.transactionsModel.getBy({
      userId: ctx.state.user.id,
      cardId: ctx.params.id,
    });

    const data = transacations.map(({
      id, sum, time, type,
    }) => ([
      id,
      renderPaymentType(type),
      parseFloat(sum),
      moment(time).format('L'),
      moment(time).format('LTS'),
    ]));

    const formData = [{
      name: 'Отчет по транзакциям',
      data,
    }];

    const opt = {
      url: `http://localhost:${process.env.REPORT_SERVICE_PORT || 3333}/xlsx`,
      encoding: null,
      json: formData,
    };

    ctx.body = request.post(opt);
  },
};
