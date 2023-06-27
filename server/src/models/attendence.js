const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema({
  gymID: { 
    type: String, 
    required: true 
  },
  userID: { 
    type: String, 
    required: true 
  },
  attendence: [
    {
      checkIN: {
        type: Date,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        expires: '365d',
      },
      checkOut: {
        type: Date,
      },
    },
  ],
});

const attendence = mongoose.model('attendence', attendenceSchema);

module.exports = attendence;
