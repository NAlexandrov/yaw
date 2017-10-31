'use strict';

const errorController = require('../../source/controllers/error.js');

describe('errorController', () => {
  test.skip('should throw an error', async () => {
    await expect(errorController()).rejects.toBeInstanceOf(Error);
  });
});
