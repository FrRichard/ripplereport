var config =  require('config');


var Transaction = Backbone.Model.extend({

	initialize: function(attr,params) {
		var query = {
		    txhash:params.txhash
		};

		this.url = config.historicalapi.transaction.urlModel+JSON.stringify(query);	
	}

});


module.exports = Transaction;