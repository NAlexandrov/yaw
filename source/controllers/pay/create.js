'use strict';

const ApplicationError = require('../../../libs/application-error');

module.exports = async (ctx) => {
  const log = ctx.log.child({ controller: 'PayController', method: 'create' });
  const cardId = Number(ctx.params.id);
  const { sum, phoneNumber } = ctx.request.body;

  log.trace({
    cardId,
    body: ctx.request.body,
  });

  const card = await ctx.cardsModel.get(cardId);

  if (!card) {
    throw new ApplicationError(`No card with id ${cardId}`, 404);
  }

  const newBalance = Number(card.balance) - Number(sum);

  const transaction = {
    type: 'paymentMobile',
    data: phoneNumber,
    time: (new Date()).toISOString(),
    cardId,
    sum,
  };

  await ctx.cardsModel.save(Object.assign({}, card, {
    balance: newBalance,
  }));

  const newTransaction = await ctx.transactionsModel.create(transaction);

  ctx.status = 201;
  ctx.body = newTransaction;
};
