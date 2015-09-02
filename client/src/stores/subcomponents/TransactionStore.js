var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _Transaction = {};


function registerTransaction(result) {
	var transactions = result.toJSON();

	_.each(transactions, function(transaction) {
		_Transaction[transaction.id] = transaction;
	});
};

var TransactionStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _Transaction;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _Transaction[key];
		return res;
	},

	emitChange: function(result) {
		var self=this;
		var transactions = result.toJSON();
		_.each(transactions, function(transaction) {
			self.emit(transaction.id);
		});
	},

	emitLoading: function(event) {
		this.emit(event);
	},

	addChangeListener: function(transaction,callback) {
		this.on(transaction, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});


TransactionStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_TRANSACTION:	
  		 	registerTransaction(action.result); 	
  		 	TransactionStore.emitChange(action.result); 		
  		 	break;
  		 case Constants.ActionTypes.TX_ISLOADING:
			TransactionStore.emitLoading('isloading');
			break;
  	}


  	
  	return true;

});


module.exports = TransactionStore;