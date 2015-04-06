var config =  require('config');


var RippleOfferExercised = Backbone.Model.extend({

	initialize: function(attr,account,period) {

		var query = {
		    "account"   : account,
		    "startTime" : period.startTime,
		   	"endTime"   : period.endTime,
		    "format"    : "json"
		}
		this.url= config.rippledataapi.account_offers_exercised.urlModel+JSON.stringify(query);		
	}

});


module.exports = RippleOfferExercised;