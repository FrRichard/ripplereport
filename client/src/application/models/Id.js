var config =  require('Config');


var RippleId = Backbone.Model.extend({

	initialize: function(attr,toresolve) {
		this.url= config.rippleaccount.id.urlModel+toresolve;		
	}

});


module.exports = RippleId;



	// defaults: {
	// 	address: "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
	// 	blobvault: "https://id.ripple.com",
	// 	emailVerified: true,
	// 	id:"mysterioususer",
	// 	identity_verified:"false",
	// 	exists: true,
	// 	username: "MysteriousUser",	
	// 	recoverable: true,
	// 	profile_verified: false,
	// 	reserved: false
	// }