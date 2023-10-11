const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
    // unique: true,
  },
  symbol: {
    type: String,
    // required: true,
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
