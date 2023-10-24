const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('MongoDB Connected');
  } catch (err) {
    console.log('Error connecting to MongoDB Atlas:', err);
  }
};

module.exports = connectDB;
