'use strict';

const defaultConfig = {
  name: 'Yet Another Wallet',
  listen: {
    address: 'localhost',
    port: 3000,
  },
  logger: {
    level: 'info',
  },
};

const appCfg = require('rc')('yaw', defaultConfig);

module.exports = appCfg;
