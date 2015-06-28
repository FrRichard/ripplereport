var config = require('Config');

var RippleInfo = Backbone.Model.extend({

	initialize: function(attr,toresolve) {
		this.url= config.rippleaccount.info.urlModel+toresolve;
	}

});


// {
//    "account_data": {
//       "Account": "rGd4FaNjg22EvTuot3SRKF1suueUSc8Lhd",
//       "Balance": "111774282371",
//       "Flags": 0,
//       "LedgerEntryType": "AccountRoot",
//       "OwnerCount": 11,
//       "PreviousTxnID": "6728ABF280DC9AC13C5047FD162BF1A30E92ECEA8D819C85386FEFB5FCEDB124",
//       "PreviousTxnLgrSeq": 10281649,
//       "Sequence": 824,
//       "index": "D7A220425B3724E841753B95E9005A3627F38A0DB53EDCEA6F4A5E17AFD5B3D6"
//    },
//    "ledger_current_index": 10412188,
//    "validated": false
// }

module.exports = RippleInfo;