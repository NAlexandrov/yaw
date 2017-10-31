'use strict';

const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const configFile = path.join(__dirname, 'config', `${String(process.env.NODE_ENV || 'default').toLowerCase()}.env`);
const config = require('dotenv').config({ path: configFile });
const logger = require('./libs/logger.js');
const app = require('./source/app.js');

if (config.error) {
  logger.fatal(`Config not loaded: ${config.error.toString()}`);
  logger.trace(config.error);
  process.exit(1);
}

if (config.parsed) {
  logger.debug(`Config loaded from ${configFile}`);
  logger.trace(config.parsed);
}

const PORT = process.env.PORT || 3000;

function listenCallback() {
  logger.info(`Yet another wallet started at port: ${PORT}. Environment: ${process.env.NODE_ENV}`);
}

if (process.env.HTTPS) {
  const protocolSecrets = {
    key: fs.readFileSync(path.join(__dirname, '.ssl', 'private.key')),
    cert: fs.readFileSync(path.join(__dirname, '.ssl', 'server.crt')),
  };

  https
    .createServer(protocolSecrets, app.callback())
    .listen(PORT, listenCallback);

  // redirect from http to https if current port is 443
  if (Number(PORT) === 443) {
    http
      .createServer((req, res) => {
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
        res.end();
      })
      .listen(80);
  }
} else {
  app.listen(PORT, listenCallback);
}
