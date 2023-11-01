const express = require('express');
const {
  createNewArtist,
  getAllArtists,
  getArtist,
  loginArtist,
  getProfile,
  updateArtist,
  deleteArtist
} = require('../controllers/artists.controller');
const { loginValidation } = require('../middleware/validateLogin.middleware');
const { validateFields, validateFieldsMiddleware } = require('../middleware/validation.middleware');
const authenticateUser = require('../middleware/authentication.middleware');

const router = express.Router();

router.post('/', validateFields, validateFieldsMiddleware, createNewArtist);
router.get('/', getAllArtists);
router.post('/login', loginValidation, validateFieldsMiddleware, loginArtist);
router.post('/me', authenticateUser, getProfile);
router.put('/', updateArtist);
router.delete('/', deleteArtist);
router.get('/:id', getArtist);

module.exports = router;
