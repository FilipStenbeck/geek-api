const express = require('express');
const env = require('./env');
const rootHandler = require('./handlers/rootHandler');
const hotGamesHandler = require('./handlers/hotGamesHandler');
const gameDetailsHandler = require('./handlers/gameDetailsHandler');
const searchHandler = require('./handlers/searchHandler');

const app = express();

/*
 * Configure headers.
 */

app.use(function cors(req, res, next) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Max-Age', '3600');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Cache-Control', 'max-age=120');
  next();
});

/*
 * Configure cache
 */

const apicache = require('apicache').options({
  debug: env.API_CACHE_DEBUG,
  defaultDuration: env.API_CACHE_DURATION,
  enabled: env.API_CACHE_ENABLED,
}).middleware;

/*
 * Configure routes
 */
app.get('/', apicache(), rootHandler);
app.get('/hotgames', apicache(), hotGamesHandler);
app.get('/game/:id', apicache(), gameDetailsHandler);
app.get('/search', apicache(), searchHandler);

const port = env.PORT;
console.log('Running on port: %s', env.PORT);
app.listen(port);
