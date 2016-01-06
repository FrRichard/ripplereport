var config =  require('Config');


var RippleCapitalization = Backbone.Model.extend({

	initialize: function(attr,issuer) {

		var query = {		
			"method" : "gateway_balances",
			"params": [
			    {"account": issuer}
			]
		};

		this.url= config.rippleaccount.gateway_balances.urlModel+JSON.stringify(query);		
	}

});


module.exports = RippleCapitalization;

//query format

// {
//     "currencies" : [
//       {"currency":"JPY", "issuer":"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"},
//       {"currency":"USD", "issuer":"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"},
//       {"currency":"EUR", "issuer":"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"},
//       {"currency":"GBP", "issuer":"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"},
//       {"currency":"CNY", "issuer":"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"},
//       {"currency":"BTC", "issuer":"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"},
//       {"currency":"KRW", "issuer":"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"}
//     ]
// }