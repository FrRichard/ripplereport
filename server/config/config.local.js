var config = require('./config.global');

config.sockets = {};
config.sockets.client = {};
config.sockets.client.port = 9091;

config.mongo = {};
config.mongo.url = "mongodb://localhost/heartbit";//"mongodb://admin:fraise95@kahana.mongohq.com:10099/app24430464"

module.exports = config;