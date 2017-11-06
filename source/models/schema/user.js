const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  login: String,
  name: String,
  email: String,
  google_id: String,
  yandex_id: String,
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Card',
  }],
});

module.exports = mongoose.model('User', userSchema);
