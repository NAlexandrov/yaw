'use strict';

const fs = require('fs');
const os = require('os');
const tmp = require('tmp');
const renderDocx = require('./render-docx');
const unoconv = require('./unoconv.js');

const opt = {};
if (os.platform() === 'win32') {
  opt.exe = 'c:\\Program Files (x86)\\LibreOffice 5\\program\\python.exe';
  opt.bin = `${__dirname}\\unoconv`;
}

/*
unoconv.convert('d:\\_projects\\heroku_first\\result.docx', 'pdf', opt, (err, result) => {
  // result is returned as a Buffer
  fs.writeFile('converted.pdf', result);
});
*/

/**
 * render pdf
 * @param {String} tmplFile
 * @param {Object} tmplData
 * @param {Function} cb
 */
function renderPdf(tmplFile, tmplData/* , cb (err, result) */) {
  return renderDocx(tmplFile, tmplData)
    .then((buf) => {
      const promise = new Promise((resolve, reject) => {
        tmp.file((err, path, fd, cleanupCallback) => {
          if (err) {
            cleanupCallback();
            reject(err);
            return;
          }

          console.log('File: ', path);
          console.log('Filedescriptor: ', fd);

          fs.writeFile(path, buf, (err2) => {
            if (err2) {
              cleanupCallback();
              reject(err2);
              return;
            }
            // If we don't need the file anymore we could manually call the cleanupCallback
            // But that is not necessary if we didn't pass the keep option because the library
            // will clean after itself.
            unoconv.convert(path, 'pdf', opt, (err3, result) => {
              cleanupCallback();

              if (err3) {
                reject(err3);
                return;
              }

              resolve(result);
            });
          });
        });
      });

      return promise;
    });
}

module.exports = renderPdf;
