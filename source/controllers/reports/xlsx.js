'use strict';

const request = require('request');
const moment = require('moment');

const renderPaymentType = require('../../../libs/render-payment-type.js');

moment.locale('ru');

// http://localhost:8000/reports/transactions.xlsx

module.exports = {
  handler: async (ctx) => {
    const transacations = await ctx.transactionsModel.getAll();

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
      name: 'transactions',
      data,
    }];

    const opt = {
      url: 'http://localhost:3333/xlsx',
      encoding: null,
      json: formData,
    };

    ctx.body = request.post(opt);
  },
};
