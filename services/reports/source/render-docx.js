'use strict';

const fs = require('fs');
const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');

/**
 * render docx
 * @param {String} tmplFile
 * @param {Object} tmplData
 * @param {Function} cb
 */
function renderDocx(tmplFile, tmplData/* , cb (err, result) */) {
  const promise = new Promise((resolve, reject) => {
    // Load the docx file as a binary
    fs.readFile(tmplFile, 'binary', (err, content) => {
      if (err) {
        reject(err);
        return;
      }

      const zip = new JSZip(content);
      const doc = new Docxtemplater();
      doc.loadZip(zip);

      // set the templateVariables
      doc.setData(tmplData);

      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
      } catch (error) {
        const e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        };
        console.log(JSON.stringify({ error: e }));
        /* The error thrown here contains additional information
        when logged with JSON.stringify (it contains a property object). */
        // throw error;
        reject(e);
        return;
      }

      const buf = doc.getZip().generate({ type: 'nodebuffer' });
      resolve(buf);
    });
  });

  return promise;
  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  // fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
}

module.exports = renderDocx;
