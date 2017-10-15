'use strict';

const appCfg = require('./config.js');
const { logger, tracer } = require('./libs/logger.js')(appCfg);
const app = require('./source/app.js')(appCfg, logger, tracer);

app.listen(appCfg.port, () => {
  logger.trace(appCfg);
  logger.info(`Yet another wallet started at port: ${appCfg.port}`);
});
