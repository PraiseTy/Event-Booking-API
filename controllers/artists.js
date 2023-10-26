const Artist = require('../models/Artist');

const createNewArtist = async (req, res) => {
  res.json('Create new artists');
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
