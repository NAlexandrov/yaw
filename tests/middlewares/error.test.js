'use strict';

const ApplicationError = require('../../libs/application-error.js');
const errorHandler = require('../../source/middlewares/error.js');

const ctx = {
  log: {
    error: jest.fn(),
  },
};

describe('errorHandler()', () => {
  test('should throw error with status 400', async () => {
    const next = jest.fn(() => {
      throw new ApplicationError('TestError', 400);
    });

    await errorHandler(ctx, next);
    expect(ctx.log.error.mock.calls.length).toBeGreaterThan(0);
    expect(next.mock.calls.length).toBe(1);
    expect(ctx).toHaveProperty('status', 400);
  });

  test('should throw error with status 500', async () => {
    const next = jest.fn(() => {
      throw new Error('TestError');
    });

    await errorHandler(ctx, next);
    expect(ctx.log.error.mock.calls.length).toBeGreaterThan(0);
    expect(next.mock.calls.length).toBe(1);
    expect(ctx).toHaveProperty('status', 500);
  });
});
