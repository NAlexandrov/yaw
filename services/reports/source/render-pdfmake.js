'use strict';

const path = require('path');

const fonts = {
  Roboto: {
    normal: path.join(__dirname, '..', 'assets', 'Roboto-Regular.ttf'),
    bold: path.join(__dirname, '..', 'assets', 'Roboto-Medium.ttf'),
    italics: path.join(__dirname, '..', 'assets', 'Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, '..', 'assets', 'Roboto-MediumItalic.ttf'),
  },
};

const PdfPrinter = require('pdfmake');

const printer = new PdfPrinter(fonts);

function renderPdfMake(data) {
  return printer.createPdfKitDocument(data);
}

module.exports = renderPdfMake;
