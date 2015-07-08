var config =  require('Config');


var RippleAccountTransaction = Backbone.Model.extend({

	initialize: function(attr,account,params) {
		var query = {
		  	account:account
		}
		_.each(params, function(param,key) {
			query[key] = param;
		});

		this.url = config.historicalapi.account_transactions.urlModel+JSON.stringify(query);	
	}

});


module.exports = RippleAccountTransaction;