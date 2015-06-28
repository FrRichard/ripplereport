var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleTrade = [];
var test = [];

function registerTrade(result) {
	var trades = result;
	_.each(trades, function(trade) {
		var pair = trade.item + ':' + trade.currency;
		if(!_RippleTrade[pair]) {
			_RippleTrade[pair] = [];
		}
		if(!_RippleTrade[pair][trade.platform]) {
			_RippleTrade[pair][trade.platform] = [];
		} 

		_RippleTrade[pair][trade.platform].unshift(trade);

		if(_RippleTrade[pair][trade.platform].length >= 10) { _RippleTrade[pair][trade.platform].pop();}

	});
	console.log("RippleTradeStore",_RippleTrade);
};

var RippleTradeStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleTrade;
	},

	getSpecific:function(pair, platform) {
		if(!_RippleTrade[pair]) {
			return "Pair is empty";
		} else if(!_RippleTrade[pair][platform]) {
			return "platform is empty";
		}
		return _RippleTrade[pair][platform];
	},

	emitChange: function(result) {
		var self=this;
		var trades = result;
		console.log("STORE_EMITTER => TRADES",trades);
		_.each(trades, function(trade) {
			var channel = trade.platform + ':' + trade.item + ':' + trade.currency;
			console.log("emitter_channel:", channel);
			self.emit(channel);
		});
	},

	emitLoading: function(event) {
		this.emit(event);
	},

	addChangeListener: function(channel,callback) {
		this.on(channel, callback);
	},

	removeChangeListener: function(channel,callback) {
		this.removeListener(channel, callback);
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