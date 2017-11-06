'use strict';

const mongoose = require('mongoose');
const utils = require('../../../libs/utils');

const { Schema } = mongoose;

const cardSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  cardNumber: {
    type: String,
    validate: {
      validator(value) {
        return utils.validateCardNumber(value);
      },
      message: '{VALUE} is not a valid card number!',
    },
    required: [true, 'Card number required'],
  },
  balance: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Card', cardSchema);
