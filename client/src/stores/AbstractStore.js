var Backbone = require('backbone');
var Dispatcher = require('Dispatcher');

var baseStore = {
	initialize: function() {
		this.dispatchId = Dispatcher.register(this.handleDispatch.bind(this));
	},
	handleDispatch: function(payload) {}
};

module.exports = {
	Model: Backbone.Model.extend(baseStore),
	Collection: Backbone.Collection.extend(baseStore)
};