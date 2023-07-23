const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  gymId: {
    type: String,
  },
  seq: {
    type: Number
  }
});

module.exports = mongoose.model('Counter', counterSchema);
