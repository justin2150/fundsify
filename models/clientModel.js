const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  DOB: {
    type: String,
  },
  SSN: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: Object,
  },
  mailbox: {
    type: String,
  },
  secretKey: {
    type: String,
  },
  images: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Client = mongoose.model('clients', Schema);

module.exports = Client;
