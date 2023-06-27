const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  gymID: {
    type: String,
    required: true,
  },
  email: {
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

module.exports = UserProfile;
