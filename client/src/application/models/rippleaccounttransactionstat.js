var config = require('config');

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

// response
// {
//     "account": "r3vv1aLTqFXACaA1E6mJRGAmvhWw6sizhF",
//     "startTime": "2014-01-01T10:00:00+00:00",
//     "endTime": "2015-03-15T10:00:00+00:00",
//     "results": {
//         "OfferCreate": 7,
//         "TrustSet": 1,
//         "Payment": 6,
//         "OfferCancel": 3
//     }
// }

module.exports = RippleAccountTransactionStats;