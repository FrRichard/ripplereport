var config =  require('Config');


var RippleAccountTransaction = Backbone.Model.extend({

	initialize: function(attr,account,params) {
		var query = {
		    type  : params.type,
		    // result: "testSUCCESS",
		    limit: params.limit,
		    account:account,
		    min_sequence: params.min_sequence || ""
		}
		// this.url= config.rippledataapi.account_transactions.urlModel+JSON.stringify(query);	
		// var params = "accounts/" + account + "/transactions?type=Payment&result=tesSUCCESS&limit=1000";

		this.url = config.historicalapi.account_transactions.urlModel+JSON.stringify(query);	
	}

});


module.exports = RippleAccountTransaction;