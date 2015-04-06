var io = require('socket.io');
var fs = require('fs');
var _ = require('underscore');

function OfflineClientSocket(params) {
	this.server = params.server;
	this.dataPath = params.dataPath;
	this.io = io;
};

OfflineClientSocket.prototype.run = function() {
	var self = this;
	this.io.listen(this.server).on('connection', function(socket) {
		self.initServices(socket);
	});
};

OfflineClientSocket.prototype.initServices = function(socket) {
	var self = this;

	var platforms = JSON.parse(fs.readFileSync(this.dataPath + 'platforms.json'));

	socket.on('subscribe:ticker:last', function(params) {

		var tickersInterval = setInterval(function() {
			var eventIdUpdate = function(ticker) {
				var sep = ":";
				return "ticker" + sep + ticker.platform + sep + ticker.item + sep + ticker.currency + sep + 'last';
			};
			var tickerGenerator = function() {
				var roundToN = function(num, n) {
					return +(Math.round(num + "e+" + n) + "e-" + n);
				};
				var getRandomValue = function(n, min, max) {
					if (!min && !max && !n) {
						min = 400;
						max = 1200;
						n = 3;
					}
					return roundToN(Math.random() * (max - min) + min, n);
				};
				var timestamp = moment().format('X');

				var getRandomApi = function() {
					var api = {};
					var platform = _.sample(platforms, 1)[0];
					var pair = _.sample(platform.pairs, 1)[0];
					return {
						platform: platform.id,
						item: pair.item.id,
						currency: pair.currency.id
					};
				};
				var selectedParams = getRandomApi();

				var ticker = {
					"platform": selectedParams.platform,
					"item": selectedParams.item,
					"currency": selectedParams.currency,
					"high": getRandomValue(),
					"last": getRandomValue(),
					"low": getRandomValue(),
					"id": timestamp,
					"sell": getRandomValue(),
					"updated": timestamp,
					"wavg": getRandomValue(),
					"daily": getRandomValue(2, 0, 10),
					"vol": getRandomValue(0, 5000, 50000)
				};
				return ticker;
			};
			var newTicker = tickerGenerator();
			socket.emit(eventIdUpdate(newTicker), newTicker);
		}, 10000);

		socket.on('unsubscribe:ticker', function() {
			clearInterval(tickersInterval);
			console.log('');
			console.log('unsubscribe:ticker');
			console.log('');
		});

		socket.on('disconnect', function() {
			clearInterval(tickersInterval);
		});

		console.log('');
		console.log('subscribe new ticker service');
		console.log('');

	});

};

module.exports = OfflineClientSocket;