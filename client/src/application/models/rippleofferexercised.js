var config =  require('config');


var RippleOfferExercised = Backbone.Model.extend({

	initialize: function(attr,account,period,timeIncrement) {
		console.log(account,period,timeIncrement);
		var query = {
		    "account"   : account,
		    "startTime" : period.startTime,
		   	"endTime"   : period.endTime,
		    "format"    : "json",
		    "timeIncrement": timeIncrement
		}
		this.url= config.rippledataapi.account_offers_exercised.urlModel+JSON.stringify(query);		
	}

});


module.exports = RippleOfferExercised;