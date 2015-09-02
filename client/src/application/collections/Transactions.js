var transaction = require('Transaction');
var config = require('Config');


var transactions = Backbone.Collection.extend({
	model: transaction,

	initialize: function() {

	},

	createTransactionList: function(tx) {
		var self = this;
		this.reset();
		var xhrs = _.map(tx, function(t,i) {
			var id = "transaction" +i;

			var model = new transaction({id:id},t);
			var xhr = model.fetch({
				success: function(model,response) {
					//console.log("responseee");
					self.add(model);
				},
				error: function(error) {
					//console.log("erooooor",error);
				}
			});       
			return xhr;       
        });
	     
        var sync = $.when.apply(null, xhrs);

	    return sync;

	}
});

module.exports = transactions;