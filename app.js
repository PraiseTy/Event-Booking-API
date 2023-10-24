const express = require('express');

app = express();

app.use(express.json())

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send({ msg: 'inital commit' });
});

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();