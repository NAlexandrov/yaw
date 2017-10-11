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
    this.log = this.log.child({
      model: 'FileModel',
      sourceFileName,
    });
  }

  async loadFile() {
    const log = this.log.child({ function: 'loadFile' });

    if (!this._dataSource) {
      try {
        const data = await readFile(this._dataSourceFile);
        this._dataSource = JSON.parse(data);
      } catch (err) {
        log.error({
          success: false,
          error: err,
        });

        throw new ApplicationError('Read model error', 500);
      }
    }

    log.trace({ success: true });

    return this._dataSource;
  }

  async getAll() {
    return this.loadFile();
  }

  async get(id) {
    const card = this._dataSource.find((item) => item.id === id);

    this.log.trace({
      function: 'get',
      card,
    });

    return card;
  }

  /**
   * Генерирует новый id для записи
   * @return {Number}
   * @private
   */
  _generateId() {
    const newId = this._dataSource.reduce((max, item) => Math.max(max, item.id), 0) + 1;

    this.log.trace({
      function: '_generateId',
      newId,
    });

    return newId;
  }

  /**
   * Сохраняет изменения
   * @private
   */
  async _saveUpdates() {
    const log = this.log.child({ function: '_saveUpdates' });

    try {
      await writeFile(this._dataSourceFile, JSON.stringify(this._dataSource, null, 2));
    } catch (err) {
      log.error({
        success: false,
        error: err,
      });

      throw new ApplicationError('Save model error', 500);
    }

    log.trace({ success: true });
  }
}

module.exports = FileModel;
