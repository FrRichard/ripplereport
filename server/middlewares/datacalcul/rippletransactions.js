var _ = require('underscore');
var Promise = require("promise");
// var gatewayNames = require("gatewayNames");
var gatewayNames = require("../../utils/gatewayNames");

function Rippletransactions() {}

Rippletransactions.prototype.calculate = function(data) {
	var data = data;

	var createObjectStructure_promise = new Promise.denodeify(function createObjectStructure(data) {
		data.summary.top10 = {};
		data.summary.totalcash = {};
		_.each(data.summary, function(sum,currency) {
			if(currency != "top10" && currency != "totalcash") {
				data.summary.top10[currency] = {
					sent : [],
					received : []
				};
				data.summary.totalcash[currency] = {
					cashin:0,
					cashout:0,
					standard:0
				};
			}
		});
	});

	function fill_top10(data) {
		_.each(data.transactions, function(transaction) {
			data.summary.top10[transaction.currency][transaction.type].push(transaction);
		});
	}

	function compare (a,b) {
		if(a.amount < b.amount) {
			return 1;
		}
		if(a.amount > b.amount) {
			return -1;
		}
		return 0;
	}

	function orderAndTrunc(data) {
		_.each(data.summary.top10, function(d,currency) {
			_.each(data.summary.top10[currency], function(type,typekey) {
				data.summary.top10[currency][typekey].sort(compare);
			});
		});
		_.each(data.summary.top10, function(d,currency) {
			_.each(data.summary.top10[currency], function(type, typekey) {
				data.summary.top10[currency][typekey] = data.summary.top10[currency][typekey].slice(0,10);
			});
		});
	}

	function cashinout(d) {
		var accounttransaction = d;

		_.each(gatewayNames, function(gateway) {
			// filter gatewaysaddress(receiver&sender)
			var cash = _.filter(accounttransaction.transactions, function(transaction,i) {
				if(gateway.address == transaction.counterparty) {
					if(transaction.type == "received") {
						data.transactions[i]["direction"] = "cashin";
					} else  {
						data.transactions[i]["direction"] = "cashout";
					}
				} 
			});

			//filter hotwallets
			var hotwallets = [];
			_.each(gateway.hotwallets, function(hotwallet) {
				_.each(hotwallet, function(address) {
					hotwallets.push(address);
				});
			});
			hotwallets = _.unique(hotwallets);
			_.each(hotwallets, function(hotwallet) {
				var cash = _.filter(accounttransaction.transactions, function(transaction,i) {
					if(hotwallet == transaction.counterparty) {
						if(transaction.type == "received") {
							data.transactions[i]["direction"] = "cashin";
						} else  {
							data.transactions[i]["direction"] = "cashout";
						}
					}
				});

			});

			_.each(accounttransaction.transactions, function(transaction) {
				if(!transaction.direction) {
					transaction["direction"]="standard";
				}
			});

		});

	}

	function totalcash(d) {
		_.each(d.transactions, function(transaction) {
			if(transaction.direction =="cashin") {
				data.summary.totalcash[transaction.currency]["cashin"] += transaction.amount;
			} else if(transaction.direction == "cashout") {
				data.summary.totalcash[transaction.currency]["cashout"] += transaction.amount;
			} else if(transaction.direction == "standard") {
				data.summary.totalcash[transaction.currency]["standard"] += transaction.amount;
			}
		});

	}

	createObjectStructure_promise(data)
		.then(fill_top10(data))
		.then(orderAndTrunc(data))
		.then(cashinout(data))
		.then(totalcash(data));

	return data;

}

module.exports = Rippletransactions;