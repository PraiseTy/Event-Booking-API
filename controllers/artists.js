const Artist = require('../models/Artist');
const HTTP_STATUS = require('../constant');

const createNewArtist = async (req, res) => {
  const artist = await Artist.create({ ...req.body });
  const token = artist.createJWT();
  res
    .status(HTTP_STATUS.CREATED)
    .json({ message: 'Artist created successfully', data: { id: artist._id, name: artist.name } });
};

const getAllArtists = async (req, res) => {
  res.json('Get all artists');
};

const getArtist = async (req, res) => {
  res.json('Get a single artist');
};

const loginArtist = async (req, res) => {
  res.json('Log in artist');
};

const getArtistProfile = async (req, res) => {
  res.json('Return an artist profile');
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
  getArtistProfile,
  updateArtist,
  deleteArtist
};
