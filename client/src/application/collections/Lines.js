var RippleLine = require('Line');
var config = require('Config');


var RippleLines = Backbone.Collection.extend({
	model: RippleLine,

	initialize: function() {

	},

	createLinesList: function(toresolves) {
		var self = this;
		this.reset();
		
		xhrs = _.map(toresolves, function(toresolve,i) {
			var model = new RippleLine({id:toresolve.id},toresolve.address);
			var xhr = model.fetch({
					success: function(model,response) {
						self.add(model);
					}, 
					error: function(error) {
					}			
			}); 
			return xhr;       
        });

        var sync = $.when.apply(null, xhrs);

	    return sync;

	}
});

module.exports = RippleLines;