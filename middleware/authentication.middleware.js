const jwt = require('jsonwebtoken');
const HTTP_STATUS = require('../constant');
const logger = require('../logging/logger');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid Credentials' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      _id: payload.artistId,
      name: payload.name,
      email: payload.email,
      bio: payload.bio
    };
    next();
  } catch (error) {
    logger.error(error);
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Invalid Authentication' });
  }
};

module.exports = auth;
