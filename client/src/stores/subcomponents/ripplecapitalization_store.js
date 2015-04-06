var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleCapitalizations = {};


function registerCapitalization(result) {
	var capitalizations = result.toJSON();

	_.each(capitalizations, function(capitalization) {
		_RippleCapitalizations[capitalization.id] = capitalization;
	});
	console.log("_RippleCapitalizationsStore",_RippleCapitalizations);
};

var RipplecapitalizationStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleCapitalizations;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleCapitalizations[key];
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


RipplecapitalizationStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_RIPPLECAPITALIZATION:	
  		 	registerCapitalization(action.result); 	
  		 	RipplecapitalizationStore.emitChange(action.result); 		
  		 	break;
  	}


  	
  	return true;

});


module.exports = RipplecapitalizationStore;