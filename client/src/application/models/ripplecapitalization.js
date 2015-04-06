var config =  require('config');


var RippleCapitalization = Backbone.Model.extend({

	initialize: function(attr,issuer) {
		var query = 	{
			"currencies" : [
			      {"currency":"JPY", "issuer":issuer},
			      {"currency":"USD", "issuer":issuer},
			      {"currency":"EUR", "issuer":issuer},
			      {"currency":"GBP", "issuer":issuer},
			      {"currency":"CNY", "issuer":issuer},
			      {"currency":"BTC", "issuer":issuer},
			      {"currency":"KRW", "issuer":issuer},
			      {"currency":"LTC", "issuer":issuer},
			      {"currency":"DOG", "issuer":issuer}
			]
		}
		this.url= config.rippledataapi.issuer_capitalization.urlModel+JSON.stringify(query);		
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