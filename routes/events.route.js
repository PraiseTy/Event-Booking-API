const express = require('express');
const {
  createNewEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/events.controller');
const validateEvents = require('../middleware/eventValidation.middleware');
const authenticateUser = require('../middleware/authentication.middleware');
const { validateFieldsMiddleware } = require('../middleware/validation.middleware');

const router = express.Router();

router.post('/', validateEvents, validateFieldsMiddleware, authenticateUser, createNewEvent);
router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.put('/:id', authenticateUser, updateEvent);
router.delete('/:id', authenticateUser, deleteEvent);

module.exports = router;
