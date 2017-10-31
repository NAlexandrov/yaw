'use strict';

const { Transform } = require('stream');
const mongoose = require('mongoose');

const stringify = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk));
    callback();
  },
});

mongoose.connect('mongodb://localhost/school-wallet', { useMongoClient: true });
mongoose.Promise = global.Promise;

const cardsSchema = mongoose.Schema(
  {
    id: Number,
    cardNumber: Number,
    balance: Number,
  },
  {
    collection: 'cards',
  },
);

const Card = mongoose.model('cards', cardsSchema);

// const cursor = Card.find().cursor();

/* cursor.pipe(through2({ objectMode: true }, function (chunk, enc, next) {
  this.push(JSON.stringify(chunk));
  next();
})).pipe(process.stdout); */

const getAll = () => Card.find().cursor();
getAll().pipe(stringify).pipe(process.stdout);

/* const cards = mongoose.connection.collection('cards').find({}, (err, cursor) => {
  cursor.pipe(process.stdout);
}); */
