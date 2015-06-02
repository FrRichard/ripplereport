var _ = require('underscore');
var Promise = require("promise");

function Rippleoffersexercised() {}

Rippleoffersexercised.prototype.calculate = function(data) {

	var data = data;
	data.summary = {
		top10: {
			base:{},
			counter:{}
		},
		total: {
			base:{},
			counter:{}
		}, 
		currencies: {
			base: {},
			counter: {}
		}

	}
	function compare_counter_amount(a,b) {
		if(a.counter.amount < b.counter.amount) {
			return 1;
		}
		if(a.counter.amount > b.counter.amount) {
			return -1;
		}
		return 0;
	}
 
	function compare_base_amount(a,b) {
		if(a.base.amount < b.base.amount) {
			return 1;
		}
		if(a.base.amount > b.base.amount) {
			return -1;
		}
		return 0;
	}

	// create data.summary.currencies array structure
	function addfields_currencies(data) {
		_.each(data.results, function(d) {
			if(_.isObject(d.counter)) {
				data.summary.currencies.counter[d.counter.currency] = [];
				data.summary.total.counter[d.counter.currency] = {};
				data.summary.top10.counter[d.counter.currency] = {};
				// data.summary.total.type[d.counter.currency][d.counter.issuer] = 0;
			}
			if(_.isObject(d.base)) {
				data.summary.currencies.base[d.base.currency] = [];
				data.summary.total.base[d.base.currency] = {};
				data.summary.top10.base[d.base.currency] = {};
			}
		});
	}

	function addfields_total_type(fields) {
		_.each(fields.counter, function(field,currency) {
			_.each(field, function(issuer) {
				data.summary.total.counter[currency][issuer] = {
					ordernumber:0,
					amount:0,
					averageamount:0
				};
			});
		});
		_.each(fields.base, function(field,currency) {
			_.each(field, function(issuer) {
				data.summary.total.base[currency][issuer] = {
					ordernumber:0,
					amount:0,
					averageamount:0
				}
			});
		});
	}
 
	function fill_currencies(data) {
		_.each(data.results, function(d) {
			if(_.isObject(d.counter)) {
				data.summary.currencies.counter[d.counter.currency].push(d.counter.issuer);
				data.summary.currencies.counter[d.counter.currency] = _.uniq(data.summary.currencies.counter[d.counter.currency]);
				data.summary.currencies.base[d.base.currency].push(d.base.issuer);
				data.summary.currencies.base[d.base.currency] = _.uniq(data.summary.currencies.base[d.base.currency]);
				data.summary.top10.counter[d.counter.currency][d.counter.issuer] = {};
				data.summary.top10.counter[d.counter.currency] = _.uniq(data.summary.top10.counter[d.counter.currency]);
				data.summary.top10.base[d.base.currency][d.base.issuer] = {};
				data.summary.top10.base[d.base.currency] = _.uniq(data.summary.top10.base[d.base.currency]);
				// data.summary.total.type[d.counter.currency][d.counter.issuer] += 1;
			}
		});
	}
	
	var fill_total_promise = new Promise.denodeify(function fill_total(data) {
		_.each(data.results, function(d) {
			if(_.isObject(d.counter)) {
				data.summary.total.counter[d.counter.currency][d.counter.issuer].ordernumber += 1;
				data.summary.total.counter[d.counter.currency][d.counter.issuer].amount += d.counter.amount;
			}
			if(_.isObject(d.base)) {
				data.summary.total.base[d.base.currency][d.base.issuer].ordernumber += 1;
				data.summary.total.base[d.base.currency][d.base.issuer].amount += d.base.amount;
			}
		}); 
	});

	function calculateaverage(data) {
		_.each(data.summary.total.counter, function(currency,currencykey) {
			_.each(currency, function(issuers,issuerkey) {
				var amount = data.summary.total.counter[currencykey][issuerkey].amount;
				var ordernumber = data.summary.total.counter[currencykey][issuerkey].ordernumber;
				data.summary.total.counter[currencykey][issuerkey].averageamount = amount/ordernumber;
			});
		});
		_.each(data.summary.total.base, function(currency,currencykey) {
			_.each(currency, function(issuers,issuerkey) {
				var amount = data.summary.total.base[currencykey][issuerkey].amount;
				var ordernumber = data.summary.total.base[currencykey][issuerkey].ordernumber;
				data.summary.total.base[currencykey][issuerkey].averageamount = amount/ordernumber;
			});
		});
	}

	function fill_top10(data) {
		_.each(data.results, function(d) {
			data.summary.top10.counter[d.counter.currency].push(d);
			data.summary.top10.base[d.base.currency].push(d);
		});
	}

	function order_trunc(data) {
		_.each(data.summary.top10.counter, function(d,currencykey) {
			data.summary.top10.counter[currencykey].sort(compare_counter_amount);
		});
		_.each(data.summary.top10.base, function(d,currencykey) {
			data.summary.top10.base[currencykey].sort(compare_base_amount);
		});
		_.each(data.summary.top10.counter, function(d,currencykey) {
			data.summary.top10.counter[currencykey] = data.summary.top10.counter[currencykey].slice(0,10);
		});
		_.each(data.summary.top10.base, function(d,currencykey) {
			data.summary.top10.base[currencykey] = data.summary.top10.base[currencykey].slice(0,10);
		});

	} 
	
	addfields_currencies(data);
	fill_currencies(data);
	addfields_total_type(data.summary.currencies);
	fill_total_promise(data).then(calculateaverage(data));
	fill_top10(data);
	order_trunc(data);


	return data;
}



module.exports = Rippleoffersexercised;