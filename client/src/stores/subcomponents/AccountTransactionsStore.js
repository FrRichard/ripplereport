var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');
var gatewayNames = require('GatewayNames');

var CHANGE_EVENT = 'change';
var _RippleAccountTransactions = {};


function registerAccountTransactions(result) {
	var accounttransactions = result;

	_.each(accounttransactions, function(accounttransaction) {
		_RippleAccountTransactions[accounttransaction.id] = accounttransaction;
	});
	console.log("_RippleAccountTransactionsStore",_RippleAccountTransactions);
};

function registerStatus(status) {
	_RippleAccountTransactions['status'] = status;
	// console.log("_RippleAccountTransactionsStore",_RippleAccountTransactions);
}

var RippleaccounttransactionsStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleAccountTransactions;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleAccountTransactions[key];
		return res;
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
		_RippleAccountTransactions = {};
	}

});


RippleaccounttransactionsStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
		case Constants.ActionTypes.ASK_RIPPLEACCOUNTTRANSACTIONS:	
			console.log("ATRANSACTION_STOOOOOOOOOOREEEE REGIESTER", action.result);
			registerAccountTransactions(action.result); 
			RippleaccounttransactionsStore.emitChange(action.result); 

			break;

		case Constants.ActionTypes.ISLOADING:
			RippleaccounttransactionsStore.emitLoading('isloading');
			break;

		case Constants.ActionTypes.ISLOADING_ACCOUNTTRANSACTIONS:
			RippleaccounttransactionsStore.emitLoading('isloading');
			break;

		case Constants.ActionTypes.LOADINGSTATUS_ACCOUNTTRANSACTIONS:
			registerStatus(action.result);
			RippleaccounttransactionsStore.emitLoading('loadingstatus');
			break;
  	}


  	
  	return true;

});


module.exports = RippleaccounttransactionsStore;