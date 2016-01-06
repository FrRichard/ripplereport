var RippleOfferExercised = require('OfferExercised');
var config = require('Config');


var RippleOffersExercised = Backbone.Collection.extend({
	model: RippleOfferExercised,

	initialize: function() {

	},

	createOffersexercisedList: function(accounts,period) {
		var self = this;
		this.reset();
		if(period == undefined) {
			var period = config.rippledataapi.default_period;
			var timeIncrement = null;
		} else if(period =="sum") {
			var period = config.rippledataapi.default_period_sum;
			var timeIncrement = "week";
		}

		var xhrs = _.map(accounts, function(account) {
			var model = new RippleOfferExercised({id:account.id},account.address,period,timeIncrement);
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

module.exports = RippleOffersExercised;