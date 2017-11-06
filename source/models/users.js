'use strict';

const ApplicationError = require('../../libs/application-error.js');
const MongoModel = require('./common/mongoModel.js');

const has = Object.prototype.hasOwnProperty;

class Users extends MongoModel {
  constructor(config) {
    const modelName = 'User';
    super(Object.assign(config, { modelName }));
    this.log = this.log.child({ modelName });
  }

  async create(user) {
    const log = this.log.child({
      function: 'create',
    });

    const isDataValid = user && has.call(user, 'email');

    if (!isDataValid) {
      throw new ApplicationError('User data is invalid', 400);
    }

    const id = await this._generateId();
    const newUser = Object.assign({}, user, { id });

    await this._insert(newUser);

    log.trace('New user added', newUser);

    return newUser;
  }

  static async remove() {
    throw new ApplicationError('User can\'t be removed', 400);
  }
}

module.exports = Users;
