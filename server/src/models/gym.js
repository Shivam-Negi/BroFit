const mongoose = require('mongoose');

const gymSchema = new mongoose.Schema({
  gymName: {
    type: String,
    required: true,
  },
  gymId: {
    type: String,
    required: true,
  },
  owner: {
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
  mobile: {
    type: Number,
    // required: true,
  },
  plans : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Plan'
    }
  ],
  members : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    }
  ]
});

module.exports = mongoose.model('Gym', gymSchema);
