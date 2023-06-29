const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
  attendance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
    },
  ],
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
