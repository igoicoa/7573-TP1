const express = require('express');
const app = express();

const PORT = 3000;
const TIMEOUT = 5 * 1000;
const url_sync = 'http://bbox:9090/'
const url_async = 'http://bbox:9091/'

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

app.get('/sync', (req, res) => {
    //metrics('sync')
    axios.get(url_sync).then(res_service => {
        res.status(200).send(`Res sync service\n ${res_service.data}\n`)
    })
})

app.get('/async', (req, res) => {
    //metrics('async')
    axios.get(url_async).then(res_service => {
        res.status(200).send(`Res async service\n ${res_service.data}\n`)
    })
})