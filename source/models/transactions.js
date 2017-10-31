'use strict';

const ApplicationError = require('../../libs/application-error');
const MongoModel = require('./common/mongoModel');

class Transactions extends MongoModel {
  constructor(config) {
    const modelName = 'Transaction';
    super(Object.assign(config, { modelName }));
    this.log = this.log.child({ modelName });
  }

  /**
   * Добавляет новую транзакцию
   *
   * @param {Object} transaction - описание транзакции
   * @returns {Promise.<Object>}
   */
  async create(transaction) {
    const id = await this._generateId();

    const newTransaction = Object.assign({}, transaction, { id });

    await this._insert(newTransaction);

    return newTransaction;
  }

  /**
   * Получает транзакции по идентификатору карты
   * @param {Number} cardId - Идентификатор карты
   * @return {Promise.<Object[]>}
   */
  async getByCard(cardId) {
    const item = await this.getBy({ cardId });
    return item;
  }

  /**
   * Удаление транзакции
   */
  static async remove() {
    throw new ApplicationError('Transaction can\'t be removed', 400);
  }
}

module.exports = Transactions;
