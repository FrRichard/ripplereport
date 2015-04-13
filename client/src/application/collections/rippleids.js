var RippleId = require('rippleid');
var config = require('config');



var RippleIds = Backbone.Collection.extend({
	model: RippleId,

	initialize: function() {

	},

	createIdList: function(toresolves) {
		var AccountActions = require('AccountActions');
		var self = this;
		this.reset();

		var xhrs = _.map(toresolves, function(toresolve,i) {
				var j = i + 1
				var model = new RippleId({id:"address"+j},toresolve);
				var xhr = model.fetch({
					success: function(model,response) {
						if (model.attributes.exists == false) {
							model.attributes.address = toresolve,
							model.attributes.username = "This address has no username"
						}
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

module.exports = RippleIds;