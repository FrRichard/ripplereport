var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleAccountTransactions = {};


function registerAccountTransactions(result) {
	var accounttransactions = result.toJSON();

	_.each(accounttransactions, function(accounttransaction) {
		_RippleAccountTransactions[accounttransaction.id] = accounttransaction;
	});
	console.log("_RippleAccountTransactionsStore",_RippleAccountTransactions);
};

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
		var addresses = result.toJSON();
		_.each(addresses, function(address) {
			self.emit(address.id);
		});
	},

	addChangeListener: function(address,callback) {
		this.on(address, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});


RippleaccounttransactionsStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_RIPPLEACCOUNTTRANSACTIONS:	
  		 	registerAccountTransactions(action.result); 	
  		 	RippleaccounttransactionsStore.emitChange(action.result); 		
  		 	break;
  	}


  	
  	return true;

});


module.exports = RippleaccounttransactionsStore;