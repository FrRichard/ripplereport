var RippleAccountTransactionStat = require('rippleaccounttransactionstat');
var config = require('config');


var RippleAccountTransactionStats = Backbone.Collection.extend({
	model: RippleAccountTransactionStat,

	initialize: function() {

	},

	createAccountTransactionStatsList: function(accounts) {
		var self = this;
		this.reset();
		var xhrs = _.map(accounts, function(account) {
			var model = new RippleAccountTransactionStat({id:account.id},account.address);
			var xhr = model.fetch({
				success: function(model,response) {
					self.add(model);
				}
			});       
			return xhr;       
        });
	     
        var sync = $.when.apply(null, xhrs);

	    return sync;

	}
});

module.exports = RippleAccountTransactionStats;