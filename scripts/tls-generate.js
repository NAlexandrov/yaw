'use strict';

const fs = require('fs');
const path = require('path');
const selfsigned = require('selfsigned');
// const config = require('../config.js');

const sslPath = path.join(__dirname, '..', '.ssl');
const privateKey = path.join(sslPath, 'private.key');
const publicKey = path.join(sslPath, 'public.key');
const serverCert = path.join(sslPath, 'server.crt');
// const attrs = [{ name: config.name, value: config.listen.address }];
const pems = selfsigned.generate(null, { days: 365 });

if (!fs.existsSync(sslPath)) {
  fs.mkdirSync(sslPath);
}

if (!fs.existsSync(privateKey)) {
  fs.writeFileSync(privateKey, pems.private);
}

if (!fs.existsSync(publicKey)) {
  fs.writeFileSync(publicKey, pems.public);
}

if (!fs.existsSync(serverCert)) {
  fs.writeFileSync(serverCert, pems.cert);
}
