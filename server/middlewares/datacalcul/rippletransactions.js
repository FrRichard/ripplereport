var _ = require('underscore');
var Promise = require("promise");

function Rippletransactions() {}

Rippletransactions.prototype.calculate = function(data) {
	var data = data;


	var createObjectStructure_promise = new Promise.denodeify(function createObjectStructure(data) {
		data.summary.top10 = {};
		_.each(data.summary, function(sum,currency) {
			if(currency != "top10") {
				data.summary.top10[currency] = {
					sent : [],
					received : []
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

	createObjectStructure_promise(data).then(fill_top10(data)).then(orderAndTrunc(data));

	return data;

}

module.exports = Rippletransactions;