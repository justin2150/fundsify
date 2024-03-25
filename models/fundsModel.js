const { Schema, model } = require('mongoose');

const fundSchema = Schema({
  amount: Number,
  purpose: String,
  appID: Number,
  appStatus: {
    type: Number,
    default: 1,
  },
});

const Funds = model('funds', fundSchema);

module.exports = Funds;
