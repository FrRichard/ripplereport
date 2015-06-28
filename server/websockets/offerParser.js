var parseBalanceChanges = require('ripple-lib-transactionparser').parseBalanceChanges;
var _ = require("lodash");

var OfferParser = function(data) {
	var data = JSON.parse(data);
	var result = {
		account:"",
		type: "",
		fee: "",
		TakerGets:"",
		TakerPays:"",
		date:"",
		hash:"",
		owner_funds:"",
		balance_changes:"",
		item:"",
		currency:"",
		volumeitem:"",
		volumecurrency:"",
		type:"",
		price:""
	}


	if(data.engine_result) {
		if(data.engine_result == "tesSUCCESS") {
			result.type = data.transaction.TransactionType;
			result.account = data.transaction.Account;
			result.fee = data.transaction.Fee;
			result.TakerGets = data.transaction.TakerGets;
			result.TakerPays = data.transaction.TakerPays;
			result.date = data.transaction.date;
			result.hash = data.transaction.hash;
			result.owner_funds = data.transaction.owner_funds;
			result.balance_changes = parseBalanceChanges(data.meta);

			_.each(result.balance_changes, function(data, account) {
				if(account == result.account) {_
					_.each(data, function(change) {
						if(change.currency == "XRP") {
							result.item = change.currency;
							result.volumeitem = Math.abs(change.value);
							if(change.value < 0) {
								result.type = "ASK";
							} else {
								result.type = "BID";
							}
						} else {
							result.currency = change.currency;
							result.volumecurrency = Math.abs(change.value);
						}
					});

					result.price = result.volumecurrency/result.volumeitem;
				}
			});

			// if(data.transaction.Account == "rGd4FaNjg22EvTuot3SRKF1suueUSc8Lhd" ) {
			if(result.price > 0) {
				return result;
				// console.log(result);
				// console.log("----------------------------------------------------------------------------------------------------------");
				// console.log("----------------------------------------------------------------------------------------------------------");
			}
		}
	} 
};




module.exports = OfferParser;