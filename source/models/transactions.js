'use strict';

const ApplicationError = require('../../libs/application-error');
const FileModel = require('./common/fileModel');

class Transactions extends FileModel {
  constructor(config) {
    super(Object.assign(config, {
      sourceFileName: 'transactions.json',
    }));

    this.log = this.log.child({
      modelName: 'Transactions',
    });
  }

  /**
   * Добавляет новую транзакцию
   *
   * @param {Object} transaction - описание транзакции
   * @returns {Promise.<Object>}
   */
  async create(transaction) {
    const newTransaction = Object.assign({}, transaction, {
      id: this._generateId(),
    });
    this._dataSource.push(newTransaction);
    await this._saveUpdates();
    return newTransaction;
  }

  /**
   * Получает транзакции по идентификатору карты
   * @param {Number} cardId - Идентификатор карты
   * @return {Promise.<Object[]>}
   */
  async getByCard(cardId) {
    return this._dataSource.filter((transaction) => transaction.cardId === cardId);
  }

  /**
   * Удаление транзакции
   */
  // eslint-disable-next-line
  async remove() {
    throw new ApplicationError('Transaction can\'t be removed', 400);
  }
}

module.exports = Transactions;
