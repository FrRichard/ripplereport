var RippleExchangerate = require('rippleexchangerate');
var config = require('config');


var RippleExchangerates = Backbone.Collection.extend({
	model: RippleExchangerate,

	initialize: function() {
		this.officialcurrencies = ['USD','EUR','JPY','CNY','BRL','CAD','KRW','MXN','SGD','GBP','XAU','XAG'];
		// this.officialcurrencies = ['USD','EUR','JPY','CNY','BRL'];
	},

	getExchangerates: function(accountslines) {
		var self = this;
		this.reset();

		// request formating
		var ratesqueries ={};
		_.each(accountslines, function(accountline) {
			var lines = [];
			_.each(accountline.lines, function(line,i) {
				if(line.balance > 0) {
					lines.push(accountline.lines[i]);
				}
			});
			var pairs = _.map(lines, function(line)  {
				range = "year";
				pair = {};
				pair["base"]= { currency:line.currency, issuer:line.account };
				pair["counter"]= { currency:"XRP" };

				return pair;

			});
			ratesqueries[accountline.id] = {};
			ratesqueries[accountline.id]["pairs"]=pairs;
			ratesqueries[accountline.id]["range"] = range;
			ratesqueries[accountline.id]["id"] = accountline.id;
		});

		
		var xhrs = _.map(ratesqueries, function(ratesquery) {
			var model = new RippleExchangerate({id:ratesquery.id},ratesquery);
			var xhr = model.fetch({
				success: function(model,response) {
					self.add(model);
				}
			});       
			return xhr;       
        });
	     
        var sync = $.when.apply(null, xhrs);
	    // sync.then(function() {
	    //     self.trigger('someshit');
	    // });

	    return sync;

	}
});

module.exports = RippleExchangerates;