var config =  require('Config');


var RippleMarketTrader = Backbone.Model.extend({

	initialize: function(attr,params,full) {
		if(full) {
			var query = {

			  "period" : "7d",
			  "transactions":true,
			  "format":"json"
			}	
		} else {

			var query = {
				"base" : {
				    "currency" : params.base.currency,
				    "issuer" : params.base.issuer,
				},
				"counter" : {
				    "currency" : params.counter.currency ,
				    "issuer"   : params.counter.issuer
				},
				"period" : params.period,
				"transactions":params.transactions,
				"format":"json"
			}
		}

		this.url= config.rippledataapi.market_traders.urlModel+JSON.stringify(query);		
	}

});


module.exports = RippleMarketTrader;