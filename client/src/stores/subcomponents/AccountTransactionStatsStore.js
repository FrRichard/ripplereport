var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleAccountTransactionStats = {};


function registerAccountTransactionStats(result) {
	var accounttransactionstats = result.toJSON();

	_.each(accounttransactionstats, function(accounttransactionstat) {
		_RippleAccountTransactionStats[accounttransactionstat.id] = accounttransactionstat;
	});
	// console.log("_RippleAccountTransactionStatsStore",_RippleAccountTransactionStats);
};

var RippleaccounttransactionstatsStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleAccountTransactionStats;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleAccountTransactionStats[key];
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


RippleaccounttransactionstatsStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_RIPPLEACCOUNTTRANSACTIONSTATS:	
  		 	registerAccountTransactionStats(action.result); 	
  		 	RippleaccounttransactionstatsStore.emitChange(action.result); 		
  		 	break;
  	}


  	
  	return true;

});


module.exports = RippleaccounttransactionstatsStore;