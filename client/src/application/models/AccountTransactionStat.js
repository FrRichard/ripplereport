var config = require('Config');

var RippleAccountTransactionStats = Backbone.Model.extend({
	initialize: function(attr,issuer) {
		var query = {
		    "account"   : issuer,
		    "start" : "2015-05-10T00:00:00",
		   	"end"   : "2015-08-28T00:00:00",
		    "format"    : "json"
		}
		this.url= config.rippledataapi.account_transaction_stats.urlModel+JSON.stringify(query);	
	}

});

module.exports = RippleAccountTransactionStats;