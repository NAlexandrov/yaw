'use strict';

const ApplicationError = require('../libs/application-error.js');

describe('ApplicationError', () => {
  test('should return a default status', () => {
    const TestError = new ApplicationError('TestError');
    expect(TestError.status).toEqual(500);
  });

  test('should return a user defined status', () => {
    const TestError = new ApplicationError('TestError', 400);
    expect(TestError.status).toEqual(400);
  });
});
