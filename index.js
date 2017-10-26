'use strict';

const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const appCfg = require('./config.js');
const { logger, tracer } = require('./libs/logger.js')(appCfg);
const app = require('./source/app.js')(appCfg, logger, tracer);

logger.trace(appCfg);

function listenCallback() {
  logger.info(`Yet another wallet started at port: ${appCfg.listen.port}`);
}

if (process.env.HTTPS) {
  const protocolSecrets = {
    key: fs.readFileSync(path.join(__dirname, '.ssl', 'private.key')),
    cert: fs.readFileSync(path.join(__dirname, '.ssl', 'server.crt')),
  };

  https
    .createServer(protocolSecrets, app.callback())
    .listen(appCfg.listen.port, listenCallback);

  // redirect from http to https
  if (Number(appCfg.listen.port) === 443) {
    http.createServer((req, res) => {
      res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
      res.end();
    }).listen(80);
  }
} else {
  app.listen(appCfg.listen.port, listenCallback);
}
