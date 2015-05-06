var RippleInfo = require('rippleinfo');
var config = require('config');


var RippleInfos = Backbone.Collection.extend({
	model: RippleInfo,

	initialize: function() {

	},

	createInfosList: function(toresolves) {
		var self = this;
		this.reset();
		
		xhrs = _.map(toresolves, function(toresolve,i) {
			var j = i + 1;
			if(toresolve.id) {
				var id = toresolve.id;
				var address = toresolve.address;
			} else {
				var id = "address" +j ;
				var address = toresolve;
			}

			var model = new RippleInfo({id:id},address);
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

module.exports = RippleInfos;