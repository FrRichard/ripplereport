var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');
var Constants = require('Constants');

var PayloadSources = Constants.PayloadSources;

var appDispatcher = assign(new Dispatcher() , {

	handleViewAction: function(action) {

		var payload = {
	     	source: PayloadSources.VIEW_ACTION,
	    	action: action
   		};
   		// console.log("DISPATCHER",payload);
    	this.dispatch(payload);
	},

	handleServerAction: function(action) {
		var payload = {
	     	source: PayloadSources.SERVER_ACTION,
	    	action: action
   		};
    	this.dispatch(payload);
	}

});


module.exports = appDispatcher;
