var RippleAccountOffer = require('AccountOffer');
var config = require('Config');


var RippleAccountOffers = Backbone.Collection.extend({
	model: RippleAccountOffer,

	initialize: function() {

	},

	createAccountOffersList: function(toresolves) {
		// var RippledataActions = require("RippledataActions");
		var self = this;
		this.reset();
		
		xhrs = _.map(toresolves, function(toresolve,i) {
			var model = new RippleAccountOffer({id:toresolve.id},toresolve.address);
			var xhr = model.fetch({
					success: function(model,response) {
						self.add(model);
					}, 
					error: function(error) {
						//console.log("FETCHERROR_rippleaccountoffers",error);
					}			
			}); 
			return xhr;       
        });

        var sync = $.when.apply(null, xhrs);

	    return sync;

	}
});

module.exports = RippleAccountOffers;