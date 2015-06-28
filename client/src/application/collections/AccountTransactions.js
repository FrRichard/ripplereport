var RippleAccountTransaction = require('AccountTransaction');
var config = require('Config');


var RippleAccountTransactions = Backbone.Collection.extend({
	model: RippleAccountTransaction,

	initialize: function() {

	},

	createAccountTransactionsList: function(accounts) {
		var self = this;
		this.reset();
		var xhrs = _.map(accounts, function(account) {
			var model = new RippleAccountTransaction({id:account.id},account.address);
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