const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  player: String,
  activity: String,
  duration: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Session", sessionSchema);
