const express = require('express');
const {
  createNewArtist,
  getAllArtists,
  getArtist,
  loginArtist,
  getProfile,
  updateArtist,
  deleteArtist
} = require('../controllers/artists');
const { loginValidation } = require('../middleware/validateLogin');
const { validateFields, validateFieldsMiddleware } = require('../middleware/validation');
const authenticateUser = require('../middleware/authentication');

const router = express.Router();

router.post('/', validateFields, validateFieldsMiddleware, createNewArtist);
router.get('/', getAllArtists);
router.get('/:id', getArtist);
router.post('/login', loginValidation, validateFieldsMiddleware, loginArtist);
router.post('/me', authenticateUser, getProfile);
router.put('/', updateArtist);
router.delete('/', deleteArtist);

module.exports = router;
