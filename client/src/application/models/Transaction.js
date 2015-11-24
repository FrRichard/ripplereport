var config =  require('Config');


var Transaction = Backbone.Model.extend({

	initialize: function(attr,txhash) {
		var query = {
		    txhash:txhash
		};

		this.url = config.historicalapi.transaction.urlModel+JSON.stringify(query);	
	}

});


module.exports = Transaction;