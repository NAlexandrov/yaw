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

  test('should throw a error', async () => {
    ctx.cardsModel.get.mockReturnValueOnce(null);
    await expect(createController(ctx)).rejects.toBeInstanceOf(Error);
  });

  test('should throw a error if amount not a number', async () => {
    const ctxWithOutAmount = Object.assign({}, ctx, {
      request: {
        body: { ...testPay, amount: null },
      },
    });
    await expect(createController(ctxWithOutAmount)).rejects.toBeInstanceOf(Error);
  });

  test('should throw a error if phoneNumber is empty', async () => {
    const ctxWithOutPhone = Object.assign({}, ctx, {
      request: {
        body: { ...testPay, phoneNumber: null },
      },
    });
    await expect(createController(ctxWithOutPhone)).rejects.toBeInstanceOf(Error);
  });
});
