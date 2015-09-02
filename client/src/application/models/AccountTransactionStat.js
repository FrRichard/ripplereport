var config = require('Config');

var RippleAccountTransactionStats = Backbone.Model.extend({
	initialize: function(attr,issuer) {
		var query = {
		    "account"   : issuer,
		    "startTime" : "jan 1, 2014 10:00 am",
		   	// "endTime"   : "mar 15, 2015 10:00 am",
		    "format"    : "json"
		}
		this.url= config.rippledataapi.account_transaction_stats.urlModel+JSON.stringify(query);	
	}

});

module.exports = RippleAccountTransactionStats;