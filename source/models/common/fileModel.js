'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const Model = require('./model');
const ApplicationError = require('../../../libs/application-error');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class FileModel extends Model {
  constructor(sourceFileName) {
    super();
    this._dataSourceFile = path.join(__dirname, '..', '..', 'data', sourceFileName);
    this._dataSource = null;
  }

  async loadFile() {
    if (!this._dataSource) {
      try {
        const data = await readFile(this._dataSourceFile);
        this._dataSource = JSON.parse(data);
      } catch (err) {
        console.error(`Read model ${this._dataSourceFile} error`, err);
        throw new ApplicationError('Read model error', 500);
      }
    }

    return this._dataSource;
  }

  async getAll() {
    return this.loadFile();
  }

  async get(id) {
    return this._dataSource.find((item) => item.id === id);
  }

  /**
   * Генерирует новый id для записи
   * @return {Number}
   * @private
   */
  _generateId() {
    return this._dataSource.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }

  /**
   * Сохраняет изменения
   * @private
   */
  async _saveUpdates() {
    try {
      await writeFile(this._dataSourceFile, JSON.stringify(this._dataSource, null, 2));
    } catch (err) {
      console.error(`Save model ${this._dataSourceFile} error`, err);
      throw new ApplicationError('Save model error', 500);
    }
  }
}

module.exports = FileModel;
