var Trade = require('rippletrade');
var config = require('parametersManagerConfig');


var Trades = Backbone.Collection.extend({
	model:Trade,

	initialize: function(options) {
		var self = this;

		if (!options) {
			options = {};
		}

		this.platforms = options.platforms || config.rippleDefaultplatforms;

		_.each(this.platforms, function(platform, id) {
			console.log("PLATEFORMID",platform,id);
			_.each(platform.pairTrades, function(pair) {
				console.log("PAIRTRADES",pairTrades);
				var initParams = {
					platform: platform.id,
					item: pair.item,
					currency: pair.currency
				}

				var trade = new Trade(initParams);
				self.add(trade)
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