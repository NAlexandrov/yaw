'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  cardId: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  type: String,
  data: Schema.Types.Mixed,
  time: {
    type: Date,
    default: Date.now,
  },
  sum: String,
});

module.exports = mongoose.model('Transaction', transactionSchema);
