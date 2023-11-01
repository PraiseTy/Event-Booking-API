const express = require('express');
const {
  createNewEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/events.controller');

const router = express.Router();

router.post('/', createNewEvent);
router.get('/events', getAllEvents);
router.get('/id', getEvent);
router.put('/id', updateEvent);
router.delete('/id', deleteEvent);

module.exports = router;
