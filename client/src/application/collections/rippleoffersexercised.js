var RippleOfferExercised = require('rippleofferexercised');
var config = require('config');


var RippleOffersExercised = Backbone.Collection.extend({
	model: RippleOfferExercised,

	initialize: function() {

	},

	createOffersexercisedList: function(accounts,period) {
		var self = this;
		this.reset();
		if(period == undefined) {
			period = config.rippledataapi.default_period;
		}

		var xhrs = _.map(accounts, function(account) {
			var model = new RippleOfferExercised({id:account.id},account.address,period);
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

module.exports = RippleOffersExercised;