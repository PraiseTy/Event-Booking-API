const { body } = require('express-validator');

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .matches(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/)
    .withMessage('Invalid email domain'),
  body('name').notEmpty().withMessage('Name is required'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
];

module.exports = { loginValidation };
