var Constants = require('Constants');
var Dispatcher = require('Dispatcher');



var DashboardActions = {
	
	update: function(newconf) {

	},

	registerCurrentRef: function(nodes) {
		Dispatcher.handleViewAction({
			actionType: Constants.ActionTypes.REGISTER_CURRENTREFGRID,
			result: nodes
		});		
	},

	registerCurrent: function(id) {
		Dispatcher.handleViewAction({
			actionType: Constants.ActionTypes.REGISTER_CURRENTGRID,
			result: {id:id}
		});		
	},

	registerconf: function(conf) {
		Dispatcher.handleViewAction({
			actionType: Constants.ActionTypes.REGISTER_CONF,
			result: { conf:conf }
		})
	},

	addwidget: function(items,blocknum) {
		Dispatcher.handleViewAction({
			actionType: Constants.ActionTypes.ADD_WIDGET,
			result: {items:items,blocknum:blocknum}
		});
	},

	removewidget: function(items) {
		Dispatcher.handleViewAction({
			actionType: Constants.ActionTypes.REMOVE_WIDGET,
			result: {items:items}
		});
	}

}

module.exports = DashboardActions;