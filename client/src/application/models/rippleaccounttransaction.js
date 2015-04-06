var config =  require('config');


var RippleAccountTransaction = Backbone.Model.extend({

	initialize: function(attr,account) {
		var query = {
		    "startTime"  : "jan 1, 2012 10:00 am",
		    // "endTime"    : "mar 23, 2015 10:00 am",
		    "account"    : account,
		    "limit"     : 1000,
		    "descending" : true,
		    "format" : "json"
		}
		this.url= config.rippledataapi.account_transactions.urlModel+JSON.stringify(query);		
	}

});


module.exports = RippleAccountTransaction;