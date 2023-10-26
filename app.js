require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const logger = require('./logging/logger');
const artistsRouter = require('./routes/artists');
const artistRouter = require('./routes/artists');
const eventsRouter = require('./routes/events');
const eventRouter = require('./routes/events');

app = express();

app.use(express.json());

app.use('/api/v1', artistsRouter);
app.use('/api/v1/artist', artistRouter);
app.use('/api/v1', eventsRouter);
app.use('/api/v1/event', eventRouter);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send({ msg: 'inital commit' });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => logger.info(`Server is listening on port ${port}...`));
  } catch (error) {
    logger.error(`Error occurred: ${error.message}`);
    process.exit(1);
  }
};

start();
