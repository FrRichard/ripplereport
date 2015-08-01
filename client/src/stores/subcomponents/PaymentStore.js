var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');
var gatewayNames = require('GatewayNames');

var CHANGE_EVENT = 'change';
var _Payments = {};
var _LastFetch = {};


function registerAccountTransactions(result) {
	var accounttransactions = result;

	_.each(accounttransactions, function(accounttransaction) {
		_Payments[accounttransaction.id] = accounttransaction;
	});
	console.log("_PaymentsStore",_Payments);
}

function registerLastFetch(result) {
	_LastFetch = result;
}

function longestPath() {
	_.each(_Payments, function(data, key) {
		// console.log(data,key);
	});
}

function registerStatus(status) {
	_Payments['status'] = status;
	// console.log("_RippleAccountTransactionsStore",_RippleAccountTransactions);
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

	getLastFetch: function() {
		return _LastFetch;
	},

	emitChange: function(result) {
		var self=this;
		var addresses = result;
		_.each(addresses, function(address) {
			self.emit('change');
			self.emit(address.id);
		});
	},

	emitLoading: function(event) {
		this.emit(event);
	},

	addChangeListener: function(address,callback) {
		this.on(address, callback);
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
  	var result;
 
  	switch(action.actionType) {
		case Constants.ActionTypes.ASK_PAYMENTTRANSACTIONS:	
			registerAccountTransactions(action.result); 
			longestPath();
			PaymentsStore.emitChange(action.result); 

			break;

		case Constants.ActionTypes.ASK_PYMNTLASTFETCH:
			registerLastFetch(action.result);
			PaymentsStore.emitLoading("fetch");
		case Constants.ActionTypes.ISLOADING_PYMNTSTORE:
			PaymentsStore.emitLoading('isloading');
			break;

		case Constants.ActionTypes.ADDRESSCHANGE_PYMNTSTORE:
			PaymentsStore.emitLoading('addresschange');
			break;

		// case Constants.ActionTypes.LOADINGSTATUS_ACCOUNTTRANSACTIONS:
		// 	registerStatus(action.result);
		// 	PaymentsStore.emitLoading('loadingstatus');
		// 	break;
  	}


  	
  	return true;

});


module.exports = PaymentsStore;