require('dotenv').config();

// Enable or disable the API cache. Enabled by default
module.exports.API_CACHE_ENABLED = process.env.API_CACHE_ENABLED
  ? Boolean(process.env.API_CACHE_ENABLED)
  : true;
// Enable or disable the apicache debug output. Disabled by default.
module.exports.API_CACHE_DEBUG = process.env.API_CACHE_DEBUG
  ? Boolean(process.env.API_CACHE_DEBUG)
  : false;
// Set the API cache duration (in ms). Defaults to 2 seconds.
module.exports.API_CACHE_DURATION = process.env.API_CACHE_DURATION
  ? Number(process.env.API_CACHE_DURATION)
  : 2000;

module.exports.PORT = process.env.PORT || 3000;
