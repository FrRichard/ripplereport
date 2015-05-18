var config =  require('config');


var RippleAccountTransaction = Backbone.Model.extend({

	initialize: function(attr,account) {
		var query = {
		    type  : "Payment",
		    result: "testSUCCESS",
		    limit:1000,
		    account:account,
		    min_sequence:1
		}
		// this.url= config.rippledataapi.account_transactions.urlModel+JSON.stringify(query);	
		// var params = "accounts/" + account + "/transactions?type=Payment&result=tesSUCCESS&limit=1000";

		this.url = config.historicalapi.account_transactions.urlModel+JSON.stringify(query);	
	}

});


module.exports = RippleAccountTransaction;