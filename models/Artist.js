const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  genre: [
    {
      type: String,
      required: true
    }
  ],
  bio: String
});

module.exports = mongoose.model('Artist', artistSchema);
