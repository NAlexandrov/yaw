'use strict';

const CardsModel = require('../models/cards.js');
const TransactionsModel = require('../models/transactions.js');
const UsersModel = require('../models/users.js');

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

  ctx.usersModel = new UsersModel({
    logger: ctx.log,
  });

  await next();
};
