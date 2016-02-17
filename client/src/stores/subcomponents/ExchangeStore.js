var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var _Exchanges = {};
var CHANGE_EVENT = 'change';

function registerExchange(result) {
	_Exchanges = result.toJSON();
}

var ExchangesStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _Exchanges;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _Exchanges[key];
		return res;
	},

	emitEvent: function(event) {
		this.emit(event);
	},

	addChangeListener: function(event, callback) {
		console.log('add change listener!!', event);
		this.on(event, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	cleanAll: function() {
		_Exchanges = {};
	}

});

ExchangesStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case Constants.ActionTypes.ISLOADING_EXCHANGE:
			ExchangesStore.emitEvent('isloading');
			break;
		case Constants.ActionTypes.ASK_EXCHANGE:
			registerExchange(action.result);
			ExchangesStore.emitEvent(CHANGE_EVENT);
			break;
	}

});

module.exports = ExchangesStore;
