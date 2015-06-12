var Trade = require('ripple_trade');
var config = require('config');


var Trades = Backbone.Collection.extend({
	model:Trade,

	initialize: function(options) {
		var self = this;
		this.platformas = options.platforms;

		_.each(platforms, function(platform) {
			_.each(platform.pairTrades, function(pair) {
				var initParams = {
					platform: platform.id;
					item: pair.item,
					currency: pair.currency
				}

				var trade = new Trade(initParams);
				self.add(price)
			});

		});

		return this;

	},

	fetch: function(params, callback) {
		var self = this;

		_.each(this.models, function(price) {
			trade.socketSync();
		});

		if(callback) {
			callback();
		}
	},

	find: function() {

	},

	fetchAllLastTrades: function(params, current) {

	},

	update: function() {

	}

});


module.exports = Trades;