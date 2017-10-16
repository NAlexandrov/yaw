'use strict';

const ApplicationError = require('../../libs/application-error');
const FileModel = require('./common/fileModel');

const has = Object.prototype.hasOwnProperty;

class Cards extends FileModel {
  constructor(config) {
    super(Object.assign(config, {
      sourceFileName: 'cards.json',
    }));

    this.log = this.log.child({
      modelName: 'Cards',
    });
  }

  /**
   * Добавляет карту
   *
   * @param {Object} card - описание карты
   * @returns {Promise.<Object>}
   */
  async create(card) {
    const log = this.log.child({
      function: 'create',
    });

    const isDataValid = card
      && has.call(card, 'cardNumber')
      && has.call(card, 'balance');

    if (isDataValid) {
      const newCard = Object.assign({}, card, {
        id: this._generateId(),
      });

      this._dataSource.push(newCard);
      await this._saveUpdates();
      return newCard;
    }

    const err = new ApplicationError('Card data is invalid', 400);
    log.error({ success: false, error: err });
    throw err;
  }

  /**
   * Удаляет карту
   * @param {Number} id - идентификатор карты
   */
  async remove(id) {
    const card = await this.get(id);
    if (!card) {
      throw new ApplicationError(`Card with ID=${id} not found`, 404);
    }
    const cardIndex = this._dataSource.indexOf(card);
    this._dataSource.splice(cardIndex, 1);
    await this._saveUpdates();
  }
}

module.exports = Cards;
