var _ = require('underscore');
var Promise = require("promise");
var transactionParser = require('ripple-lib-transactionparser');
var util = require('util');

function AccountTransactions() {}

AccountTransactions.prototype.parse = function(data,account) {
	var result = {
		account:account,
		startTime: data.transactions[0].date,
		endTime: data.transactions[data.transactions.length-1].date,
		summary: {},
		transactions: []
	};

	var fillSummary = function(currency,issuer,type,amount) {
		if(!result.summary[currency]) {
			result.summary[currency] = {};
		}
		if(currency != 'XRP') {
			if(!result.summary[currency][issuer]) {
				result.summary[currency][issuer] = {};
			}
		
			if(!result.summary[currency][issuer][type]) {
				result.summary[currency][issuer][type] = {};
				result.summary[currency][issuer][type]["amount"] = 0; 
				result.summary[currency][issuer][type]["count"] = 0;
			}

			result.summary[currency][issuer][type]["amount"] += amount;
			result.summary[currency][issuer][type]["count"] +=1;
		} else {

			if(!result.summary[currency][type]) {
				result.summary[currency][type] = {};
				result.summary[currency][type]["amount"] = 0; 
				result.summary[currency][type]["count"] = 0;
			}

			result.summary[currency][type]["amount"] += amount;
			result.summary[currency][type]["count"] +=1;
		}
	};

	_.each(data.transactions, function(transac,i) {
		if(transac.tx.Destination == account || transac.tx.Account == account) {
			var parsedTransac = transactionParser.parseBalanceChanges(transac.meta);
			if(transac.tx.Destination == account) {
				if(!_.isObject(transac.tx.Amount)) {
					var currency = 'XRP';
				} else {
					var currency = transac.tx.Amount.currency;
				}

				var amount = _.filter(parsedTransac[account] , function(t) {
					return t.currency == currency;
				});
				var issuer = amount[0].counterparty;
				var type = "received";
				var counterparty = transac.tx.Account;
				amount = Math.abs(amount[0].value);			
				
				fillSummary(currency,issuer,type,amount);

			} else if(transac.tx.Account == account) {
				
				if(!_.isObject(transac.tx.SendMax)) {
					var currency = 'XRP';
				} else {
					var currency = transac.tx.SendMax.currency;
				}
 
				var amount = _.filter(parsedTransac[account] , function(t) {
					return t.currency == currency;
				});
				var issuer = amount[0].counterparty;
				amount = Math.abs(amount[0].value);
				var type = "sent";
				var counterparty = transac.tx.Destination;
				fillSummary(currency,issuer,type,amount);
			}
			
			var time = transac.date;
			var txHash = transac.hash;
			var ledgerIndex = transac.ledger_index;

			result.transactions.push({
				currency:currency,
				issuer:issuer,
				type:type,
				amount:amount,
				counterparty:counterparty,
				time:time,
				txHash:txHash,
				ledgerIndex:ledgerIndex
			});
		}

		
	});
	
	// console.log("result",result,"length",result.transactions.length);
 
	// console.log(util.inspect(result.summary, {showHidden:false ,depth:5}));

	return result;
};


module.exports =AccountTransactions;



