'use strict';

const ApplicationError = require('../../libs/application-error.js');
const MongoModel = require('./common/mongoModel.js');

const has = Object.prototype.hasOwnProperty;

class Cards extends MongoModel {
  constructor(config) {
    const modelName = 'Card';
    super(Object.assign(config, { modelName }));
    this.log = this.log.child({ modelName });
  }

  /**
   * Добавляет карту
   * @param {Object} card - описание карты
   * @param {String} card.cardNumber - номер карты
   * @param {Number} card.balance - баланс карты
   */
  async create(card) {
    const log = this.log.child({
      function: 'create',
    });

    const isDataValid = card
      && has.call(card, 'cardNumber')
      && has.call(card, 'balance')
      && has.call(card, 'userId');

    if (!isDataValid) {
      throw new ApplicationError('Card data is invalid', 400);
    }

    const isCardExist = await this.findOne({
      cardNumber: card.cardNumber,
      userId: card.userId,
    });

    if (isCardExist) {
      throw new ApplicationError('Card already exist', 400);
    }

    const id = await this._generateId();
    const newCard = Object.assign({}, card, { id });

    await this._insert(newCard);

    log.trace('New card added', newCard);

    return newCard;
  }

  /**
   * Списание средств с карты
   * @param {Number} id идентификатор карты
   * @param {Number} sum сумма
   */
  async withdraw(id, sum) {
    const card = await this.getById(id);
    const newBalance = Number(card.balance) - Number(sum);

    if (newBalance < 0) {
      throw new ApplicationError('No money');
    }

    await this._update({ id }, { balance: newBalance });
  }

  /**
   * Пополнение карты
   * @param {Number} id идентификатор карты
   * @param {Number} sum сумма
   */
  async refill(id, sum) {
    const card = await this.getById(id);
    const newBalance = Number(card.balance) + Number(sum);

    await this._update({ id }, { balance: newBalance });
  }

  /**
   * Удаляет карту
   * @param {Number} id - идентификатор карты
   */
  async remove(id) {
    const log = this.log.child({
      function: 'remove',
    });

    const card = await this.getById(id);

    if (!card) {
      throw new ApplicationError(`Card with ID=${id} not found`, 404);
    }

    const result = await this._remove({ id });

    log.trace(`Card #${id} removed successfully`);

    return result;
  }
}

module.exports = Cards;
