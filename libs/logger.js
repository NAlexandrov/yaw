'use strict';

const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'yaw',
  stream: process.stdout,
  level: process.env.LOG_LEVEL || 'info',
});

module.exports = logger;
