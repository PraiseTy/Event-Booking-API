const Artist = require('../models/Artist.model');
const HTTP_STATUS = require('../constant');
const logger = require('../logging/logger');

const createNewArtist = async (req, res) => {
  try {
    const { name, email, password, genre, bio } = req.body;
    const artist = await Artist.create({ name, email, password, genre, bio });
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Artist created successfully',
      data: { id: artist._id, name }
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong.Try Again' });
  }
};

const getAllArtists = async (req, res) => {
  try {
    const artist = await Artist.find().select('-password');
    res.json({ artist });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong.Try again' });
  }
};

const getArtist = async (req, res) => {
  const { id: artistId } = req.params;

  try {
    const artist = await Artist.findOne({ _id: artistId }).select('-password');

    if (!artist) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: `No artist with id ${artistId}. Try again` });
    }
    res.json(artist);
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong.Try again' });
  }
};

const loginArtist = async (req, res) => {
  const { email, password, name } = req.body;
  const artist = await Artist.findOne({ email });

  const isPasswordCorrect = await artist.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid Credentials' });
  }

  const token = artist.createJWT();
  res.json({
    message: 'Login Successfully',
    token,
    data: { id: artist.id, name: artist.name, email: artist.email }
  });
};

const getProfile = async (req, res) => {
  try {
    const artist = await Artist.findOne({ email: req.user.email }).select('-password');
    if (!artist) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Artist not found' });
    }

    res.json(artist);
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: 'Something went wrong. Try Again' });
  }
};

const updateArtist = async (req, res) => {
  res.json('Update artist profile');
};

const deleteArtist = async (req, res) => {
  res.json('Delete an artist profile');
};

module.exports = {
  createNewArtist,
  getAllArtists,
  getArtist,
  loginArtist,
  getProfile,
  updateArtist,
  deleteArtist
};
