var config = require('Config');

var RippleAccountOffer = Backbone.Model.extend({

	initialize: function(attr,toresolve) {
		this.url= config.rippleaccount.offers.urlModel+toresolve;
	}

});

// Response
// {
//    "account": "rGd4FaNjg22EvTuot3SRKF1suueUSc8Lhd",
//    "ledger_current_index": 12313472,
//    "offers": [
//       {
//          "flags": 131072,
//          "seq": 765,
//          "taker_gets": "171000000000",
//          "taker_pays": {
//             "currency": "USD",
//             "issuer": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
//             "value": "171000"
//          }
//       }
//    ],
//    "validated": false
// }

module.exports = RippleAccountOffer;