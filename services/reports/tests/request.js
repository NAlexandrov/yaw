'use strict';

const request = require('request');
const fs = require('fs');

const data = {
  first_name: 'Иван',
  last_name: 'Иванов',
  phone: '+79051112233',
  description: 'https://yet-another-wallet.herokuapp.com',
  transactions: [
    { label: 'ПЕРЕВОД НА КАРТУ: 676230000000000', time: '19:02', cashe: '200 Р' },
    { label: 'ПЕРЕВОД НА КАРТУ: 676230000000000', time: '20:02', cashe: '300 Р' },
    { label: 'ПЕРЕВОД НА КАРТУ: 676230000000000', time: '21:02', cashe: '400 Р' },
    { label: 'ПЕРЕВОД НА КАРТУ: 676230000000000', time: '22:02', cashe: '500 Р' },
    { label: 'ПЕРЕВОД НА КАРТУ: 676230000000000', time: '23:02', cashe: '600 Р' },
  ],
};


/* eslint no-console:0 */
console.log('Data:', data);

const formData = {
  tmpl_data: JSON.stringify(data),
  tmpl_file: fs.createReadStream(`${__dirname}/../assets/tmpl-transactions.docx`),
};

console.log('FormData:', formData);

const opt = {
  // url: 'http://localhost:3333/pdf',
  encoding: null,
  formData,
};

const optDocx = {
  url: 'http://localhost:3333/docx',
  ...opt,
};


request.post(optDocx, (err, httpResponse, body) => {
  if (err) {
    console.error('Upload failed:', err);
    return;
  }

  console.log('Upload successful!');

  fs.writeFile(`${__dirname}/result.docx`, body, 'binary', (err2) => {
    if (err2) {
      console.error('Save failed:', err2);
      return;
    }

    console.error('Save successful!');
  });
});

const optPdf = {
  url: 'http://localhost:3333/pdf',
  ...opt,
};

request.post(optPdf, (err, httpResponse, body) => {
  if (err) {
    console.error('Upload failed:', err);
    return;
  }

  console.log('Upload successful!');

  fs.writeFile(`${__dirname}/result.pdf`, body, 'binary', (err2) => {
    if (err2) {
      console.error('Save failed:', err2);
      return;
    }

    console.error('Save successful!');
  });
});

