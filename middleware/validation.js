const { body, validationResult } = require('express-validator');

const validateFields = [
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .matches(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/)
    .withMessage('Invalid email domain'),
  body('name').notEmpty().withMessage('Name is required'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  body('genre').isArray().withMessage('Genre must be an array'),
  body('bio').optional().notEmpty().withMessage('Bio cannot be empty')
];

const validateFieldsMiddleware = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateFields, validateFieldsMiddleware };
