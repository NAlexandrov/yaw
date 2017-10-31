'use strict';

const path = require('path');
const request = require('supertest');
require('dotenv').config({
  path: path.join(__dirname, 'config', `${String(process.env.NODE_ENV || 'default').toLowerCase()}.env`),
});

const logger = require('../libs/logger.js');

logger.trace = jest.fn();
logger.debug = jest.fn();
logger.info = jest.fn();
logger.error = jest.fn();
logger.fatal = jest.fn();

const app = require('../source/app.js');

describe('REST', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000);
  });

  test.skip('GET /cards', () =>
    request(server)
      .get('/cards')
      .expect(200));

  test.skip('GET /cards/1/transactions', () =>
    request(server)
      .get('/cards/1/transactions')
      .expect(200));

  afterAll(() => server.close());
});
