const mongoose = require('mongoose');

const gymOwnerSchema = new mongoose.Schema({
  gymId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
});

module.exports = mongoose.model('GymOwner', gymOwnerSchema);
