'use strict';

class Model {
  constructor(config) {
    this.log = config.logger.child({
      component: 'model',
    });
  }

  /**
   * Возвращает список всех объектов
   * @returns {Promise.<void>}
   */
  // eslint-disable-next-line
  async getAll() { }

  /**
   *
   * @param {Number} id Идентификатор записи для поиска
   * @returns {Promise.<void>}
   */
  // eslint-disable-next-line
  async get(id) { }

  /**
   * Создание новой записи
   * @returns {Promise.<void>}
   */
  // eslint-disable-next-line
  async create() { }

  /**
   *
   * @param {Number} id Идентификатор записи для удаления
   * @returns {Promise.<void>}
   */
  // eslint-disable-next-line
  async remove(id) { }
}

module.exports = Model;
