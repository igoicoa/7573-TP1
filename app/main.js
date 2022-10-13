const express = require('express');
const app = express();
const {execSync} = require('child_process');
const PORT = 3000;
const TIMEOUT = 5 * 1000;

app.get('/', (req, res) => {
  res.status(200).send('ping');
});

app.get('/heavy', (req, res) => {
  for (t = new Date(); new Date() - t < TIMEOUT; );
  res.status(200).send('heavy');
});

app.get('/login', (req, res) => {
  execSync('sleep 0.5');
  res.status(200).send('login_ok');
});

app.get('/carrera', (req, res) => {
  execSync('sleep 0.5');
  res.status(200).send('carrera_ok');
});

app.get('/inscripciones', (req, res) => {
  execSync('sleep 0.5');
  res.status(200).send('inscripciones_ok');
});

app.get('/materias', (req, res) => {
  execSync('sleep 0.5');
  res.status(200).send('materias_ok');
});

app.get('/inscribirse', (req, res) => {
  execSync('sleep 2');
  res.status(200).send('inscribirse_ok');
});

app.listen(PORT, function () {
  console.log('App listening on port', PORT);
});