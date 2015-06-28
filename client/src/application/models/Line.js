var config = require('Config');

var RippleLine = Backbone.Model.extend({

	initialize: function(attr,toresolve) {
		this.url= config.rippleaccount.lines.urlModel+toresolve;
	}

});


// {
//    "account": "rGd4FaNjg22EvTuot3SRKF1suueUSc8Lhd",
//    "ledger_current_index": 10414930,
//    "lines": [
//       {
//          "account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
//          "balance": "0.00051199999999992",
//          "currency": "BTC",
//          "limit": "0.5",
//          "limit_peer": "0",
//          "no_ripple": true,
//          "quality_in": 0,
//          "quality_out": 0
//       },
//       ...,
//    ],
//    "validated": false
// }

module.exports = RippleLine;