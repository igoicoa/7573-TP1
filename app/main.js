const axios = require('axios');
const express = require('express');
const moment = require('moment');
const app = express();

const PORT = 3000;
const TIMEOUT = 5 * 1000;
const url_sync = 'http://bbox:9090/';
const url_async = 'http://bbox:9091/';

const StatsD = require('node-statsd'),
      client = new StatsD(host = "graphite", port = 8125);

// Increment: Increments a stat by a value (default is 1)
function increment_metric(firstTime, metric_name) {
  const secondTime = moment();
  const timeDifference = secondTime.diff(firstTime, 'millisecond');
  console.log(metric_name + ": " + timeDifference);
  client.increment('request_count_' + metric_name);
  client.gauge('request_time_' + metric_name, timeDifference);
}



// Gauge: Gauge a stat by a specified amount

app.get('/', (req, res) => {
  const firstTime = moment();
  
  res.status(200).send('ping');
  increment_metric(firstTime, 'ping');
});

app.get('/heavy', (req, res) => {
  const firstTime = moment();
  for (t = new Date(); new Date() - t < TIMEOUT; );
  res.status(200).send('heavy');
  increment_metric(firstTime, 'heavy');
});

app.listen(PORT, function () {
  console.log('App listening on port', PORT);
});

  app.get('/sync-proxy', (req, res) => {
  const firstTime = moment();

  axios.get(url_sync).then(res_service => {
    res.status(200).send(res_service.data);
    increment_metric(firstTime, 'sync');
  });
});

app.get('/async-proxy', (req, res) => {
  const firstTime = moment();

  axios.get(url_async).then(res_service => {
    res.status(200).send(res_service.data);
    increment_metric(firstTime, 'async');
  });
});