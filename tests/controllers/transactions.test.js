'use strict';

const logger = require('../__mocks__/logger.js');
const createController = require('../../source/controllers/transactions/create.js');

const testCard = {
  cardNumber: '546925000000000',
  balance: '231310',
};

const testTransaction = {
  cardId: 1,
  type: 'prepaidCard',
  data: '220003000000003',
  time: new Date(),
  sum: '2345',
};

const ctx = {
  params: {
    id: 1,
  },
  request: {
    body: testTransaction,
  },
  cardsModel: {
    get: jest.fn(() => testCard),
  },
  transactionsModel: {
    create: jest.fn(() => testTransaction),
  },
  log: logger,
};

describe('transactionsController', () => {
  test('should create a transaction', async () => {
    await createController(ctx);
    expect(ctx.status).toEqual(201);
    expect(ctx.body).toMatchObject(testTransaction);
  });

  test('should create a transaction without time', async () => {
    const ctxWithoutTime = Object.assign({}, ctx, {
      request: {
        body: { ...testTransaction, time: null },
      },
    });
    await createController(ctxWithoutTime);
    expect(ctx.status).toEqual(201);
    expect(ctx.body).toMatchObject(testTransaction);
  });

  test('should throw a error', async () => {
    ctx.cardsModel.get.mockReturnValueOnce(null);
    await expect(createController(ctx)).rejects.toBeInstanceOf(Error);
  });

  test('should throw a error if transaction has missing fields', async () => {
    const ctxWithMissingFields = Object.assign({}, ctx, {
      request: {
        body: {},
      },
    });
    await expect(createController(ctxWithMissingFields)).rejects.toBeInstanceOf(Error);
  });

  test('should throw a error if transaction has unknown type', async () => {
    const ctxWithUnknownType = Object.assign({}, ctx, {
      request: {
        body: { ...testTransaction, type: 'unknown' },
      },
    });
    await expect(createController(ctxWithUnknownType)).rejects.toBeInstanceOf(Error);
  });

  test('should throw a error if transaction has invalid time', async () => {
    const ctxWithInvalidTime = Object.assign({}, ctx, {
      request: {
        body: { ...testTransaction, time: '1234-56-78' },
      },
    });
    await expect(createController(ctxWithInvalidTime)).rejects.toBeInstanceOf(Error);
  });
});
