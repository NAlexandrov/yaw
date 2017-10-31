'use strict';

const createController = require('../../source/controllers/cards/create.js');
const deleteController = require('../../source/controllers/cards/delete.js');
const getAllController = require('../../source/controllers/cards/get-cards.js');

const testCard = {
  number: 1,
  balance: 2,
};

const ctx = {
  params: {
    id: 1,
  },
  request: {
    body: testCard,
  },
  cardsModel: {
    create: jest.fn(() => testCard),
    remove: jest.fn(),
    getAll: jest.fn(),
  },
};

describe('cardsController', () => {
  test.skip('should create a card', async () => {
    await createController(ctx);
    ctx.cardsModel.create.mockReturnValue(testCard);
    expect(ctx.status).toEqual(201);
    expect(ctx.body).toMatchObject(testCard);
  });

  test.skip('should delete a card', async () => {
    await deleteController(ctx);
    expect(ctx.cardsModel.remove.mock.calls.length).toBe(1);
    expect(ctx.status).toEqual(200);
  });

  test.skip('should get all cards', async () => {
    await getAllController(ctx);
    expect(ctx.cardsModel.getAll.mock.calls.length).toBe(1);
  });
});
