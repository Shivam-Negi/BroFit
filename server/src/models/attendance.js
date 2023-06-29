const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  gymId: {
    type: String,
  },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref : 'User',
  // },
  //
  checkIn: {
    type: String,
  },
  day: {
    type: Date,
    default: () => new Date(),
  },
  checkOut: {
    type: String,
  },
});

const attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = attendance;
