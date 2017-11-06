'use strict';

const fs = require('fs');
const request = require('request');

// http://localhost:8000/reports/transactions.docx

module.exports = {
  handler: async (ctx) => {
    const transacations = await ctx.transactionsModel.getAll();

    const data = {
      user: ctx.state.user.name || ctx.state.user.login,
      transactions: transacations.map(({
        id, sum, time, type,
      }) => ({
        id,
        sum,
        type,
        time,
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
