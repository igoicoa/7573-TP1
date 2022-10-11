const express = require('express');
var moment = require('moment')
const app = express();

const PORT = 3000;
const TIMEOUT = 5 * 1000;
const url_sync = 'http://bbox:9090/'
const url_async = 'http://bbox:9091/'

const StatsD = require('node-statsd'),
      client = new StatsD();

// Increment: Increments a stat by a value (default is 1)
function increment_metric(time, metric_name) {
  client.increment('request_count_' + metric_name);
  client.gauge('request_time_' + metric_name, time);

}



// Gauge: Gauge a stat by a specified amount

app.get('/', (req, res) => {
  var firstTime = moment();
  
  res.status(200).send('ping');

  var secondTime = moment();
  var timeDifference = secondTime.diff(firstTime, 'seconds')
  increment_metric(timeDifference, 'ping')
});

app.get('/heavy', (req, res) => {
  var firstTime = moment();
  for (t = new Date(); new Date() - t < TIMEOUT; );
  res.status(200).send('heavy');

  var secondTime = moment();
  var timeDifference = secondTime.diff(firstTime, 'seconds')
  increment_metric(timeDifference, 'heavy')
});

app.listen(PORT, function () {
  console.log('App listening on port', PORT);
});

app.get('/sync-proxy', (req, res) => {
  var firstTime = moment();

  axios.get(url_sync).then(res_service => {
    res.status(200).send('Sync')
  })

  var secondTime = moment();
  var timeDifference = secondTime.diff(firstTime, 'seconds')
  increment_metric(timeDifference, 'sync')
})

app.get('/async-proxy', (req, res) => {
  var firstTime = moment();

  axios.get(url_async).then(res_service => {
    res.status(200).send('Async')
  })

  var secondTime = moment();
  var timeDifference = secondTime.diff(firstTime, 'seconds')
  increment_metric(timeDifference, 'async')
})