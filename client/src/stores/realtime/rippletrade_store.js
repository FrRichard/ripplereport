var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleTrade = {};


function registerTrade(result) {
	var trades = result;
	_.each(trades, function(trade) {
		var pair = trade.item + ':' + trade.currency;
		if(!_RippleTrade[pair]) {
			_RippleTrade[pair] = {};
		}
		if(!_RippleTrade[pair][trade.platform]) {
			_RippleTrade[pair][trade.platform] = [];
		}

		// if(_RippleTrade.length >= 5) { _RippleTrade.pop();}
		_RippleTrade[pair][trade.platform].unshift(trade);

	});
	console.log("_RippletradeStore",_RippleTrade);
};

var RippleTradeStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleTrade;
	},

	getSpecific:function(pair, platform) {
		return _RippleTrade[pair][platform];
	},

	emitChange: function(result) {
		var self=this;
		var trades = result;
		_.each(trades, function(trade) {
			var channel = trade.platform + ':' + trade.item + ':' + trade.currency;
			console.log("STORE_EMIT",channel);
			self.emit(channel);
		});
	},

	emitLoading: function(event) {
		this.emit(event);
	},

	addChangeListener: function(channel,callback) {
		this.on(channel, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});


RippleTradeStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_TRADE:		
  		 	registerTrade(action.result); 	
  		 	RippleTradeStore.emitChange(action.result); 	
  		 	break;
  		 case Constants.ActionTypes.ISLOADING:
			RippleTradeStore.emitLoading('isloading');
			break;
  	}


  	
  	return true;

});


module.exports = RippleTradeStore;