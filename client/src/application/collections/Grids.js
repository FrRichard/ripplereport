var Grid = require('Grid');
var config = require('Config');


var Grids = Backbone.Collection.extend({
	model: Grid,

	initialie: function() {

	},

	createIdList: function(grid) {
		
			var model = new RippleId({id:new Date().getTime(), grid:grid });
			model.fetch({
				success: function(model,response) {	
					self.add(model);
				}
			}); 
	

	}
});

module.exports = Grids;