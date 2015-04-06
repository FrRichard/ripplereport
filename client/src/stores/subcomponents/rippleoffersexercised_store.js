var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleOffersExercised = {};


function registerOffersExercised(result) {
	var offersexercised = result.toJSON();

	_.each(offersexercised, function(offerexercised) {
		_RippleOffersExercised[offerexercised.id] = offerexercised;
	});
	console.log("_RippleOffersExercisedSTORE",_RippleOffersExercised);
};

var RippleoffersexercisedStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleOffersExercised;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleOffersExercised[key];
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


RippleoffersexercisedStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_RIPPLEOFFERSEXERCISED:	
  		 	registerOffersExercised(action.result); 	
  		 	RippleoffersexercisedStore.emitChange(action.result); 		
  		 	break;
  	}


  	
  	return true;

});


module.exports = RippleoffersexercisedStore;