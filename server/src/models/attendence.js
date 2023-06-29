const mongoose = require('mongoose');

const attendenceSchema = new mongoose.Schema({
  gymId: { 
    type: String,  
  },
  // userId: { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref : 'User', 
  // },
  // 
  checkIn : {
    type : String,
  },
  day : {
    type : String,
  },
  checkOut : {
    type : String,
  }
});

const attendence = mongoose.model('Attendence', attendenceSchema);

module.exports = attendence;
