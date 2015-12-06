var RippleId = require('Id');
var config = require('Config');



var RippleIds = Backbone.Collection.extend({
	model: RippleId,

	initialize: function() {

	},

	createIdList: function(toresolves) {
		var self = this;
		this.reset();

		var xhrs = _.map(toresolves, function(toresolve,i) {
				var j = i + 1;
				if(toresolve.id) {
					var id = toresolve.id;
					var address = toresolve.address;
				} else {
					var id = "address" +j ;
					var address = toresolve;
				}

				var model = new RippleId({id:id}, address);
				var xhr = model.fetch({
					success: function(model,response) {
						if (model.attributes.exists == false) {
							model.attributes.address = toresolve,
							model.attributes.username = "This address has no username"
						}
						self.add(model);
					},
					error: function(model, response) {
						model.attributes.error = "api_unavailable";
						self.add(model);
					}
				});      
	        return xhr;		
	    });



        var sync = $.when.apply(null, xhrs);
	    return sync;

	}
});

module.exports = RippleIds;