'use strict';

const CardsModel = require('../models/cards');
const TransactionsModel = require('../models/transactions');

/**
 * Создадим модель Cards и Transactions на уровне приложения и проинициализируем ее
 */
module.exports = async function initModels(ctx, next) {
  ctx.cardsModel = new CardsModel({
    logger: ctx.log,
  });

  ctx.transactionsModel = new TransactionsModel({
    logger: ctx.log,
  });

  await next();
};
