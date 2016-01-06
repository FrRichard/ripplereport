var RippleMarketTrader = require('MarketTrader');
var config = require('Config');


var RippleMarketTraders = Backbone.Collection.extend({
	model: RippleMarketTrader,

	initialize: function() {

	},

	createMarkettradersList: function(params,full) {
		var self = this;
		this.reset();
		if (params == null) { params = ["full"]} 
		var xhrs = _.map(params, function(param,i) {
			var j = i + 1
			var model = new RippleMarketTrader({id:"address"+j},param,full);
			var xhr = model.fetch({
				success: function(model,response) {
					self.add(model);
				}
			});       
			return xhr;       
        });
	     
        var sync = $.when.apply(null, xhrs);

	    return sync;

	}
});

module.exports = RippleMarketTraders;