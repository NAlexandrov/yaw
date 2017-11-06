'use strict';

const Model = require('./model');

class MongoModel extends Model {
  constructor(config) {
    super(config);

    this.log = this.log.child({
      model: 'MongoModel',
    });

    // eslint-disable-next-line
    this._MongooseModel = require(`../schema/${config.modelName.toLowerCase()}.js`);
  }

  async getAll() {
    const data = await this._MongooseModel
      .find({})
      .lean()
      .exec();

    return data;
  }

  async getById(id) {
    const data = await this._MongooseModel
      .findOne({ id })
      .lean()
      .exec();

    return data;
  }

  async getBy(cond) {
    const data = await this._MongooseModel
      .find(cond)
      .lean()
      .exec();

    return data;
  }

  async findOne(cond) {
    const data = await this._MongooseModel
      .findOne(cond)
      .lean()
      .exec();

    return data;
  }

  /**
	 * Генерирует новый id для записи
	 * @return {Number}
	 * @private
	 */
  async _generateId() {
    const data = await this._MongooseModel
      .find()
      .sort({ id: -1 })
      .limit(1)
      .lean();

    if (!data.length) {
      return 1;
    }

    return data[0].id + 1;
  }

  async _insert(item) {
    await this._MongooseModel
      .create(item);
  }

  async _remove(id) {
    await this._MongooseModel
      .remove({ id });
  }

  async _update(cond, set) {
    await this._MongooseModel
      .update(cond, { $set: set });
  }
}

module.exports = MongoModel;
