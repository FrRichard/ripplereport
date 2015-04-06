var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _Rippleexchangeratescapitalization = {};

function registerExchangerates(result) {

	var exchangerates = result.toJSON();

	_.each(exchangerates, function(exchangerate) { 
		if(!_Rippleexchangeratescapitalization[exchangerate.id] ) { _Rippleexchangeratescapitalization[exchangerate.id] = {};} 
		_Rippleexchangeratescapitalization[exchangerate.id] = _.extend(_Rippleexchangeratescapitalization[exchangerate.id],exchangerate);
	});
	console.log("_Rippleexchangerates_capitalization_Store",_Rippleexchangeratescapitalization);
};

var RippleexchangeratescapitalizationStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _Rippleexchangeratescapitalization;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _Rippleexchangeratescapitalization[key];
		return res;
	},

	emitChange: function(result) {
		var self=this;
		var exchangerates = result.toJSON();
	
		_.each(exchangerates, function(exchangerate) {
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


RippleexchangeratescapitalizationStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;

  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_RIPPLEEXCHANGERATES_CAPITALIZATION:	 
  		 	registerExchangerates(action.result);	
  		 	RippleexchangeratescapitalizationStore.emitChange(action.result);		
  		 	break;
  	}



  	return true;
});


module.exports = RippleexchangeratescapitalizationStore;