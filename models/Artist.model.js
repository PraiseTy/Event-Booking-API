const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    required: true,
    minlength: 6
  },
  genre: [
    {
      type: String,
      required: true
    }
  ],
  bio: String
});

artistSchema.pre('save', async function preSaveHook(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

artistSchema.methods.createJWT = function createJWT() {
  return jwt.sign(
    {
      artistId: this.id,
      name: this.name,
      email: this.email
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

artistSchema.methods.comparePassword = async function comparePassword(userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};
module.exports = mongoose.model('Artist', artistSchema);
