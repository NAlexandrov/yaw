'use strict';

const request = require('request');
const moment = require('moment');

const renderPaymentType = require('../../../libs/render-payment-type.js');

moment.locale('ru');

// http://localhost:8000/reports/transactions.pdf

module.exports = {
  handler: async (ctx) => {
    const transacations = await ctx.transactionsModel.getBy({
      userId: ctx.state.user.id,
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
        {
          style: 'tableExample',
          table: {
            widths: [40, '*', 80, 80, 80],
            body: data,
          },
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

    const opt = {
      url: `http://localhost:${process.env.REPORT_SERVICE_PORT || 3333}/pdfmake`,
      encoding: null,
      json: formData,
    };

    ctx.body = request.post(opt);
  },
};
