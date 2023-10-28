const express = require('express');
const {
  createNewArtist,
  getAllArtists,
  getArtist,
  loginArtist,
  getArtistProfile,
  updateArtist,
  deleteArtist
} = require('../controllers/artists');
const { validateFields, validateFieldsMiddleware } = require('../middleware/validation');

const router = express.Router();

router.post('/', validateFields, validateFieldsMiddleware, createNewArtist);
router.get('/', getAllArtists);
router.get('/:id', getArtist);
router.post('/login', loginArtist);
router.get('/me', getArtistProfile);
router.put('/', updateArtist);
router.delete('/', deleteArtist);

module.exports = router;
