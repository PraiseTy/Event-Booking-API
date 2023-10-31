const Event = require('../models/Event.model');

const createNewEvent = async (req, res) => {
  res.json('Create New Event');
};

const getAllEvents = async (req, res) => {
  res.json('Get All Events');
};

const getEvent = async (req, res) => {
  res.json('Get a single event');
};

const updateEvent = async (req, res) => {
  res.json('Update event');
};

const deleteEvent = async (req, res) => {
  res.json('Delete event');
};

module.exports = {
  createNewEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent
};
