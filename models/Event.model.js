const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    required: true
  },
  location: String,
  description: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['scheduled', 'cancelled', 'completed'],
    default: 'scheduled'
  }
});

module.exports = mongoose.model('Event', eventSchema);
