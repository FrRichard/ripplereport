var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleAccountOffers = {};


function registerAccountOffers(result) {

	var offers = result.toJSON();
	// console.log(infos);

	_.each(offers, function(offer) {
		_RippleAccountOffers[offer.id] = offer;
	});
	console.log("_RippleAccountOffersStore",_RippleAccountOffers);
};

var RippleaccountoffersStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleAccountOffers;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleAccountOffers[key];
		return res;
	},

	emitChange: function(result) {
		var self=this;
		var addresses = result.toJSON();
		_.each(addresses, function(address) {
			self.emit(address.id);
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


RippleaccountoffersStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_RIPPLEACCOUNTOFFERS:		
  		 	registerAccountOffers(action.result); 	
  		 	RippleaccountoffersStore.emitChange(action.result); 	
  		 	break;
  		 case Constants.ActionTypes.ISLOADING:
			RippleaccountoffersStore.emitLoading('isloading');
			break;
  	}


  	
  	return true;

});


module.exports = RippleaccountoffersStore;