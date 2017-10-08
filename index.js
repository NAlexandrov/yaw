'use strict';

const appCfg = require('rc')('yaw', {
  port: 3000,
});

const app = require('./source/app.js');

app.listen(appCfg.port, () => {
  console.log(`Yet another wallet started at port: ${appCfg.port}`);
});
