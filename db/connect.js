const mongoose = require('mongoose');
const logger = require('../logging/logger');

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    logger.info('MongoDB Connected');
  } catch (err) {
    logger.error('Error connecting to MongoDB Atlas:', err);
  }
};

module.exports = connectDB;
