'use strict';

const appCfg = require('./config.js');
const log = require('./libs/logger.js')(appCfg);
const app = require('./source/app.js')(appCfg, log);

app.listen(appCfg.port, () => {
  log.trace(appCfg);
  log.info(`Yet another wallet started at port: ${appCfg.port}`);
});
