var RippleAccountTransaction = require('AccountTransaction');
var config = require('Config');


var RippleAccountTransactions = Backbone.Collection.extend({
	model: RippleAccountTransaction,

	initialize: function() {

	},

	createAccountTransactionsList: function(accounts,params) {
		var self = this;
		this.reset();
		var xhrs = _.m
		ap(accounts, function(account) {
			if(account.parent) {
				var model = new RippleAccountTransaction({id:account.id, parent:account.parent}, account.address, params);
			} else {
				var model = new RippleAccountTransaction({id:account.id}, account.address, params);			
			}
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

module.exports = RippleAccountTransactions;