'use strict';

const fs = require('fs');
const logger = require('./__mocks__/logger.js');

const testData = [{
  id: 1,
  cardId: 1,
  type: 'prepaidCard',
  data: '220003000000003',
  time: '2017-08-9T05:28:31+03:00',
  sum: '2345',
}];

const testTransaction = {
  cardId: 2,
  type: 'paymentMobile',
  data: '+7(921)3333333',
  time: '2017-08-8T06:28:31+03:00',
  sum: '-25',
};

describe('CardsModel', () => {
  let transactionModel;

  beforeAll(() => {
    fs.readFile = jest.fn((fileName, cb) => cb(null, JSON.stringify(testData)));
    fs.writeFile = jest.fn((fileName, data, cb) => cb());

    // eslint-disable-next-line
    const Transaction = require('../source/models/transactions.js');

    transactionModel = new Transaction({
      sourceFileName: 'transactions.json',
      logger,
    });

    transactionModel.loadFile();
  });

  test('should create a card', async () => {
    await expect(transactionModel.create(testTransaction)).resolves
      .toEqual(Object.assign({}, testTransaction, { id: 2 }));
  });

  test('should return an error', async () => {
    await expect(transactionModel.remove()).rejects.toBeInstanceOf(Error);
  });

  test('should return a transactions by card id', async () => {
    await expect(transactionModel.getByCard(1)).resolves.toEqual(testData);
  });

  afterAll(() => {
    fs.readFile.mockRestore();
    fs.writeFile.mockRestore();
  });
});
