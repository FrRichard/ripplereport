var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _Rippleexchangerates = {};
var i=0;

function registerExchangerates(result) {

	var exchangerates = result.toJSON();

	_.each(exchangerates, function(exchangerate) {
		_Rippleexchangerates[exchangerate.id] = exchangerate;
	});
	console.log("_RippleexchangeratesStore",_Rippleexchangerates);
};

var RippleexchangeratesStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _Rippleexchangerates;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _Rippleexchangerates[key];
		return res;
	},

	emitChange: function(result) {
		var self=this;
		var exchangerates = result.toJSON();
	
		_.each(exchangerates, function(exchangerate) {
			// console.log("ExchangeStore_emitchangei",++i);
			self.emit(exchangerate.id);
		});
	},

	addChangeListener: function(address,callback) {
		this.on(address, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	

});


RippleexchangeratesStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;

  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_RIPPLEEXCHANGERATES:	 
  		 	registerExchangerates(action.result);	
  		 	RippleexchangeratesStore.emitChange(action.result);		
  		 	break;
  	}



  	return true;
});


module.exports = RippleexchangeratesStore;