var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleLines = {};
var i =0;

function registerAccount(result) {
	var accounts = result.toJSON();

	_.each(accounts, function(account) {
		_RippleLines[account.id] = account;
	});
	console.log("_RipplelinesStore",_RippleLines);
};

var RipplelinesStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleLines;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleLines[key];
		return res;
	},

	emitChange: function(result) {
		var self=this;
		var accounts = result.toJSON();
		_.each(accounts,function(account) {
			self.emit(account.id);
		});
	},

	addChangeListener: function(address,callback) {
		this.on(address, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	

});


RipplelinesStore.dispatcherIndex= Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
 
  		 case Constants.ActionTypes.ASK_RIPPLELINES:
  		 	registerAccount(action.result); 
  		 	RipplelinesStore.emitChange(action.result);	 		
  		 	break;
  	}

  	return true;

});


module.exports = RipplelinesStore;