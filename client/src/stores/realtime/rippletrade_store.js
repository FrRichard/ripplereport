var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleTrade = {};


function registerTrade(result) {

	var trades = result.toJSON();
	// console.log(infos);

	_.each(trades, function(trade) {
		_RippleTrade[trade.id] = trade;
	});
	console.log("_RippletradeStore",_RippleTrade);
};

var RippleTradeStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleTrade;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleTrade[key];
		return res;
	},

	emitChange: function(result) {
		var self=this;
		var currencies = result.toJSON();
		_.each(currencies, function(currency) {
			self.emit(currency.id);
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
	}

});


RippleTradeStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_PRICE:		
  		 	registerPrice(action.result); 	
  		 	RippleTradeStore.emitChange(action.result); 	
  		 	break;
  		 case Constants.ActionTypes.ISLOADING:
			RippleTradeStore.emitLoading('isloading');
			break;
  	}


  	
  	return true;

});


module.exports = RippleTradeStore;