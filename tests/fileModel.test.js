/* eslint no-underscore-dangle: 0 */

'use strict';

const fs = require('fs');
const logger = require('./__mocks__/logger.js');

const testData = [{
  id: 1,
}];

describe('FileModel', () => {
  let testModel;

  beforeAll(() => {
    fs.readFile = jest
      .fn((fileName, cb) => cb(null, JSON.stringify(testData)))
      .mockImplementationOnce((fileName, cb) => cb());

    fs.writeFile = jest
      .fn((fileName, data, cb) => cb())
      .mockImplementationOnce(() => {
        throw new Error();
      });

    // eslint-disable-next-line
    const FileModel = require('../source/models/common/fileModel.js');

    testModel = new FileModel({
      sourceFileName: 'test.json',
      logger,
    });
  });

  test('loadFile()', async () => {
    await expect(testModel.loadFile()).rejects.toBeInstanceOf(Error);
    await expect(testModel.getAll()).resolves.toEqual(testData);
    await expect(testModel.getAll()).resolves.toEqual(testData);
  });

  test('get()', async () => {
    await expect(testModel.get(1)).resolves.toEqual({ id: 1 });
  });

  test('_saveUpdates()', async () => {
    await expect(testModel._saveUpdates()).rejects.toBeInstanceOf(Error);
    await expect(testModel._saveUpdates()).resolves.toBe(undefined);
  });

  test('_generateId()', () => {
    expect(testModel._generateId()).toEqual(Math.max(testData.map((i) => i.id)) + 1);
  });

  afterAll(() => {
    fs.readFile.mockRestore();
    fs.writeFile.mockRestore();
  });
});
