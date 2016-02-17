var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var _Payments = {};
var CHANGE_EVENT = 'change';

function registerPymnt(result) {
	_Payments = result;
}

var PaymentsStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _Payments;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _Payments[key];
		return res;
	},

	emitEvent: function(event) {
		this.emit(event);
	},

	addChangeListener: function(event, callback) {
		this.on(event, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	cleanAll: function() {
		_Payments = {};
	}

});

PaymentsStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case Constants.ActionTypes.ISLOADING_PYMNT:
			PaymentsStore.emitEvent('isloading');
			break;
		case Constants.ActionTypes.ASK_PYMNT:
			registerPymnt(action.result);
			PaymentsStore.emitEvent(CHANGE_EVENT);
			break;
	}

});

module.exports = PaymentsStore;
