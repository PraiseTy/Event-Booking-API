const express = require('express');
const Artist = require('../models/Artist');

const createNewArtist = async (req, res) => {
  res.json('Create new artists');
};

module.exports = {
  createNewArtist
};
