var env = process.env.NODE_ENV || 'local';
var cfg = require('./config.' + env);

module.exports = cfg;