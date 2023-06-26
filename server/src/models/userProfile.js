const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  attendence: [
    { [date]: { type: Date, required: true, expires: '30d' } },
    //   date: {
    //     type: Date,
    //     required: true,
    //     expires: '30d',
    //   },
    // },
  ],
  createdBy: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    // required : true,
  },
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
