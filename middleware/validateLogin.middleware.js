const { body } = require('express-validator');

const loginValidation = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
];

module.exports = { loginValidation };
