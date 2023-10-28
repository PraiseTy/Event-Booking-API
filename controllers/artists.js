const Artist = require('../models/Artist');
const HTTP_STATUS = require('../constant');

const createNewArtist = async (req, res) => {
  try {
    const artist = await Artist.create({ ...req.body });
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Artist created successfully',
      data: { id: artist._id, name: artist.name }
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
    data: { id: artist._id, name: artist.name, email: artist.email }
  });
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
