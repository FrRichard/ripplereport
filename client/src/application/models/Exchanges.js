var config = require('Config');

var Exchanges = Backbone.Model.extend({

	initialize: function(params) {
		if (params[0].address) {
			var param = params[0].address;
		} else {
			var param = params[0];
		}
		this.url = config.rippledataapi.exchanges.urlModel+ JSON.stringify(param);
	} 

});

module.exports = Exchanges;