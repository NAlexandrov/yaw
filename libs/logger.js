const bunyan = require('bunyan');

module.exports = (appCfg) => bunyan.createLogger({
  name: 'yaw',
  stream: process.stdout,
  level: appCfg.logger.level,
});
