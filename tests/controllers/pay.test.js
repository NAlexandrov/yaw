'use strict';

const logger = require('../__mocks__/logger.js');
const createController = require('../../source/controllers/pay/create.js');

const testPay = {
  amount: 1,
  phoneNumber: '+71234567890',
};

const ctx = {
  params: {
    id: 1,
  },
  request: {
    body: testPay,
  },
  cardsModel: {
    get: jest.fn(() => testPay),
    save: jest.fn(),
  },
  transactionsModel: {
    create: jest.fn(() => testPay),
  },
  log: logger,
};

describe('cardsController', () => {
  test('should pay', async () => {
    await createController(ctx);
    ctx.cardsModel.get.mockReturnValue(testPay);
    expect(ctx.status).toEqual(201);
    expect(ctx.body).toMatchObject(testPay);
  });
});
