'use strict';

const fs = require('fs');
const request = require('request');
const moment = require('moment');

const renderPaymentType = require('../../../libs/render-payment-type.js');

moment.locale('ru');

// http://localhost:8000/reports/transactions.docx

module.exports = {
  handler: async (ctx) => {
    const transacations = await ctx.transactionsModel.getBy({
      userId: ctx.state.user.id,
    });

    const data = {
      user: ctx.state.user.name || ctx.state.user.login,
      transactions: transacations.map(({
        id, sum, time, type,
      }) => ({
        id,
        sum,
        type: renderPaymentType(type),
        date: moment(time).format('L'),
        time: moment(time).format('LTS'),
      })),
    };

    const formData = {
      tmpl_data: JSON.stringify(data),
      tmpl_file: fs.createReadStream(`${__dirname}/tpl-transactions.docx`),
    };

    const opt = {
      url: 'http://localhost:3333/docx',
      encoding: null,
      formData,
    };

    ctx.body = request.post(opt);
  },
};
