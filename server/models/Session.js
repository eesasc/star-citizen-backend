
const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activity: { type: String, enum: ['hauling', 'mining', 'salvage', 'bunker'], required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }
});
module.exports = mongoose.model('Session', sessionSchema);
