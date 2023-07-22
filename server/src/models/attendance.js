const mongoose = require("mongoose");
const {currentDate, checkInTime} = require('../utils/helpers/datetime-helpers')

const attendanceSchema = new mongoose.Schema({
  gymId: {
    type: String,
  },
  day: {
    type: String, // Change the type to String
    default: currentDate
  },
  status: {
    type: String,
    enum: ['IN', 'OUT'],
    default: 'IN',
  },
  checkIn: {
    type: String, // Change the type to String
    default: checkInTime
  },
  checkOut: {
    type: String,
    default: ''
  },
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = attendance;
