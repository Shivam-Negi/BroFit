const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  gymId: {
    type: String,
    ref: 'Gym',
  },
  validity: {
    type: Number,
    required: true,
  },
},
{
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);
