'use strict';

const request = require('supertest');
const logger = require('./__mocks__/logger.js');
const appCfg = require('../config.js');
const { tracer } = require('../libs/logger.js')(appCfg);
const app = require('../source/app.js')(appCfg, logger, tracer);

describe('REST', () => {
  let server;

  beforeAll(() => {
    server = app.listen(appCfg.port);
  });

  test('GET /cards', () =>
    request(server)
      .get('/cards')
      .expect(200));

  test('GET /cards/1/transactions', () =>
    request(server)
      .get('/cards/1/transactions')
      .expect(200));

  afterAll(() => server.close());
});
