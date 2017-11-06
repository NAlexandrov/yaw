'use strict';

// const fs = require('fs');
const _ = require('underscore');
const childProcess = require('child_process');

const unoconv = {};
/**
* Convert a document.
*
* @param {String} file
* @param {String} outputFormat
* @param {Object|Function} options
* @param {Function} callback
* @api public
*/
unoconv.convert = function convert(file, outputFormat, options, callback) {
  if (_.isFunction(options)) {
    /* eslint no-param-reassign: 0 */
    callback = options;
    options = null;
  }

  let bin = 'unoconv';
  const stdout = [];
  const stderr = [];
  const args = [
    '-f',
    outputFormat,
    '--stdout',
  ];

  if (options) {
    if (options.exe) {
      args.unshift(options.bin || bin);
      bin = options.exe;
    } else if (options.bin) {
      /* eslint prefer-destructuring: 0 */
      bin = options.bin;
    }
    if (options.port) {
      args.push(`-p${options.port}`);
    }
  }

  args.push(file);

  const child = childProcess.spawn(bin, args);

  child.stdout.on('data', (data) => {
    stdout.push(data);
  });

  child.stderr.on('data', (data) => {
    stderr.push(data);
  });

  child.on('exit', () => {
    if (stderr.length) {
      callback(new Error(Buffer.concat(stderr).toString()));
      return;
    }

    callback(null, Buffer.concat(stdout));
  });

  /*    child.on('close', (code) => {
        if (code !== 0) {
          console.log(`ps process exited with code ${code}`);
        }
        //grep.stdin.end();
      });
*/
  child.on('error', (err) => {
    callback(err);
  });
};

module.exports = unoconv;
