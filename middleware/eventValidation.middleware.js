const { body } = require('express-validator');

const validateEvents = [
  body('title').notEmpty().withMessage('Title is required'),
  body('date').notEmpty().withMessage('Date is required')
];

module.exports = validateEvents;
