'use strict';

const xlsx = require('node-xlsx').default;

/**
 * render xlsx
 * @param {Array} sheets
 */
function renderXlsx(sheets/* , cb (err, result) */) {
  const buffer = xlsx.build(sheets);
  return buffer;
}

module.exports = renderXlsx;
