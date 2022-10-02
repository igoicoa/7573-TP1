const express = require('express');
const app = express();

const PORT = 3000;
const TIMEOUT = 5 * 1000;

app.get('/', (req, res) => {
  res.status(200).send('ping');
});

app.get('/heavy', (req, res) => {
  for (t = new Date(); new Date() - t < TIMEOUT; );
  res.status(200).send('heavy');
});

app.listen(PORT, function () {
  console.log('App listening on port', PORT);
});