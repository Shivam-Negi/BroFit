const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  attendence: [
    {
      date: {
        type: Date,
        required: true,
        expires: '30d',
      },
    },
  ],
  createdBy: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = userProfileSchema;
