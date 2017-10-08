'use strict';

const app = require('./source/app.js');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Yet another wallet started at port: ${PORT}`);
});
