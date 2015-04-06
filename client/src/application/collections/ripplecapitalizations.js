var RippleCapitalization = require('ripplecapitalization');
var config = require('config');


var RippleCapitalizations = Backbone.Collection.extend({
	model: RippleCapitalization,

	initialize: function() {

	},

	createIssuercapitalizationList: function(issuers) {
		var self = this;
		this.reset();
		var xhrs = _.map(issuers, function(issuer) {
			var model = new RippleCapitalization({id:issuer.id},issuer.address);
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

module.exports = RippleCapitalizations;