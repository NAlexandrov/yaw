'use strict';

const defaultConfig = {
  port: 3000,
  logger: {
    level: 'info',
  },
};

const appCfg = require('rc')('yaw', defaultConfig);

module.exports = appCfg;
