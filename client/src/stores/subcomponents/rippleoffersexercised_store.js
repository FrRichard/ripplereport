var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleOffersExercised = {};


function registerOffersExercised(result,sum) {
	var offersexercised = result.toJSON();

	if(sum) {
		var offersexercised_sum = result.toJSON();
		_.each(offersexercised_sum, function(sum) {
			if(!_RippleOffersExercised[sum.id]) {
				_RippleOffersExercised[sum.id] = {};
			}
			_RippleOffersExercised[sum.id]["globalorders"] = sum;
		});
	} else {
		_.each(offersexercised, function(offerexercised) {
			_.extend(_RippleOffersExercised[offerexercised.id], offerexercised);
		});
	}
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
		console.log("addresssssessss",addresses);
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


RippleoffersexercisedStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_RIPPLEOFFERSEXERCISED:	
  		 	registerOffersExercised(action.result); 	
  		 	RippleoffersexercisedStore.emitChange(action.result); 		
  		 	break;
  		 case Constants.ActionTypes.ISLOADING:
			RippleoffersexercisedStore.emitLoading('isloading');
			break;
		case Constants.ActionTypes.ASK_RIPPLEOFFERSEXERCISED_SUM:
			// console.log("summmmmmmmmmmmmmmm",action.result);
			registerOffersExercised(action.result,true);
			// RippleoffersexercisedStore.emitChange(action.result); 
			break;
  	}


  	
  	return true;

});


module.exports = RippleoffersexercisedStore;