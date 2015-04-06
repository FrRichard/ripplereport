var config =  require('config');


var RippleExchangeRate = Backbone.Model.extend({

	initialize: function(attr,ratesquery) {
		
		this.url= config.rippledataapi.exchange_rates.urlModel+JSON.stringify(ratesquery);		
	}

});


module.exports = RippleExchangeRate;


// ratesquery format

// base: {
	// currency: "CNY",
	// issuer: "rnuF96W4SZoCJmbHYBFoJZpR8eCaxNvekK",
	// name: "rippleCN"
// },
// counter: {
	// currency: "XRP"
	// },
// rate: 6.835218758111233,
// last: 6.922925506456755
// },

