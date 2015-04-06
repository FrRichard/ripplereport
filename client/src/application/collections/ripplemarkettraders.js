var RippleMarketTrader = require('ripplemarkettrader');
var config = require('config');


var RippleMarketTraders = Backbone.Collection.extend({
	model: RippleMarketTrader,

	initialize: function() {

	},

	createMarkettradersList: function(params,full) {
		var self = this;
		this.reset();
		if (params == null) { params = ["full"]} 
		console.log("uuuuuuuuuuuuh");
		var xhrs = _.map(params, function(param,i) {
			var j = i + 1
			var model = new RippleMarketTrader({id:"address"+j},param,full);
			var xhr = model.fetch({
				success: function(model,response) {
					self.add(model);
					console.log("modeeelll",model);
				}
			});       
			return xhr;       
        });
	     
        var sync = $.when.apply(null, xhrs);
	    // sync.then(function() {
	    //     self.trigger('someshit');
	    // });

	    return sync;

	}
});

module.exports = RippleMarketTraders;