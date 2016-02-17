var config = require('Config');

var Payments =Backbone.Model.extend({

	initialize: function(params) {
		if (params[0].address) {
			var param = params[0].address;
		} else {
			var param = params[0];
		}
		this.url = config.rippledataapi.payments.urlModel+ JSON.stringify(param);
	} 

});

module.exports = Payments;