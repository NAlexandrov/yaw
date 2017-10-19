'use strict';

const fs = require('fs');
const logger = require('../__mocks__/logger.js');

const testData = [{
  id: 1,
  cardNumber: 546925000000000,
  balance: 231310,
}];

const testCard = {
  cardNumber: 676230000000000,
  balance: 0,
};

describe('CardsModel', () => {
  let cardsModel;

  beforeAll(() => {
    fs.readFile = jest.fn((fileName, cb) => cb(null, JSON.stringify(testData)));
    fs.writeFile = jest.fn((fileName, data, cb) => cb());

    // eslint-disable-next-line
    const Cards = require('../../source/models/cards.js');

    cardsModel = new Cards({
      sourceFileName: 'cards.json',
      logger,
    });

    cardsModel.loadFile();
  });

  test('should create a card', async () => {
    await expect(cardsModel.create(testCard)).resolves.toEqual(Object.assign({}, testCard, { id: 2 }));
  });

  test('should remove a card', async () => {
    await expect(cardsModel.remove(2)).resolves.toBe(undefined);
  });

  test('should return error', async () => {
    await expect(cardsModel.create({})).rejects.toBeInstanceOf(Error);
    await expect(cardsModel.remove(3)).rejects.toBeInstanceOf(Error);
  });

  afterAll(() => {
    fs.readFile.mockRestore();
    fs.writeFile.mockRestore();
  });
});
