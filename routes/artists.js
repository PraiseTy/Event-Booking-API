const express = require('express');
const { createNewArtist } = require('../controllers/artists');

const router = express.Router();

router.post('/', createNewArtist);

module.exports = router;
