'use strict';

const _ = require('lodash');
const ApplicationError = require('../../../libs/application-error');

module.exports = async (ctx) => {
  const cardId = Number(ctx.params.id);
  const { amount } = ctx.request.body;
  const phone = '+7(913)2157792';

  const card = await ctx.cardsModel.get(cardId);

  if (!card) {
    throw new ApplicationError(`No card with id ${cardId}`, 404);
  }

  if (!_.isNumber(amount)) {
    throw new ApplicationError(`Amount ${amount} is not a number`, 400);
  }

  const newBalance = Number(card.balance) - Number(amount);

  const transaction = {
    cardId,
    type: 'paymentMobile',
    data: phone,
    time: (new Date()).toISOString(),
    sum: amount,
  };

  await ctx.cardsModel.save(Object.assign({}, card, {
    balance: newBalance,
  }));

  const newTransaction = await ctx.transactionsModel.create(transaction);

  ctx.status = 201;
  ctx.body = newTransaction;
};
