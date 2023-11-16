const Event = require('../models/Event.model');
const Artist = require('../models/Artist.model');
const HTTP_STATUS = require('../constant');

const createNewEvent = async (req, res) => {
  try {
    const { title, date, location, description } = req.body;
    const { _id: artistId, name } = req.user;
    const artist = await Artist.findOne({ _id: artistId });

    if (!artist) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Artist not found' });
    }
    const event = await Event.create({
      title,
      artist: { id: artistId, name: artist.name },
      date,
      location,
      description
    });
    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Event created successfully',
      data: { id: artist._id, title, location, date }
    });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: 'Something went wrong.Try again' });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const event = await Event.find();
    return res.json({ event });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: 'Something went wrong.Try again' });
  }
};

const getEvent = async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Event not found. Try again' });
    }
    return res.json(event);
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: 'Something went wrong, Try again' });
  }
};

const updateEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const { title, date, location, description } = req.body;
  try {
    const loggedInArtistId = req.user._id;
    const event = await Event.findOne({ _id: eventId, 'artist.id': loggedInArtistId });
    if (!event) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Event cannot be found. Try Again' });
    }
    const updatedEvent = await Event.updateOne(
      { _id: eventId },
      { title, date, location, description }
    );

    return res.json({
      message: 'Event updated successfully',
      data: { _id: eventId, title, location, date, description }
    });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: 'Something went wrong.Try again' });
  }
};

const deleteEvent = async (req, res) => {
  const { id: eventId } = req.params;
  try {
    const loggedInArtistId = req.user._id;
    const event = await Event.findOneAndRemove({ _id: eventId, 'artist.id': loggedInArtistId });
    if (!event) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Event not found.Try again' });
    }
    return res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: 'Something went wrong.Try again' });
  }
};

module.exports = {
  createNewEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent
};
