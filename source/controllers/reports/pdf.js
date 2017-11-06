'use strict';

const request = require('request');
const moment = require('moment');
const { Joi } = require('koa-joi-router');

const renderPaymentType = require('../../../libs/render-payment-type.js');

moment.locale('ru');

// http://localhost:8000/reports/transactions.pdf

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

    const formData = {
      content: [
        {
          style: 'header',
          text: 'Отчет по транзакциям',
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: 'center',
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };

    if (data.length) {
      formData.content.push({
        style: 'tableExample',
        table: {
          widths: [40, '*', 80, 80, 80],
          body: data,
        },
      });
    } else {
      formData.content.push({
        text: 'История операций пуста',
      });
    }

    const opt = {
      url: `http://localhost:${process.env.REPORT_SERVICE_PORT || 3333}/pdfmake`,
      encoding: null,
      json: formData,
    };

    ctx.body = request.post(opt);
  },
};
