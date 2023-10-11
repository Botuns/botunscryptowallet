const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  privateKey: {
    type: String,
    // required: true,
    // unique: true,
  },
  address: {
    type: String,
    // required: true,
    // unique: true,
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
