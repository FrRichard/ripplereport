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
			_RippleOffersExercised[sum.id]["globalorders"]["total"]= 0; 
			_.each(	_RippleOffersExercised[sum.id]["globalorders"].results, function(result) {
				_RippleOffersExercised[sum.id]["globalorders"]["total"] += result.count;
			} );


		});
	} else {
		_.each(offersexercised, function(offerexercised) {
			if(!_RippleOffersExercised[offerexercised.id]) {
					_RippleOffersExercised[offerexercised.id] = {};
			}
			_.extend(_RippleOffersExercised[offerexercised.id], offerexercised);
		});
	}
	// console.log("__RippleOffersExercisedStore",_RippleOffersExercised);
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

	emitChange: function(result,sum) {
		var self=this;
		var addresses = result.toJSON();
		if(sum) {
			_.each(addresses, function(address) {
				self.emit(address.id+'sum');
			});
		} else {
			_.each(addresses, function(address) {
				self.emit(address.id);
			});
		}
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
			registerOffersExercised(action.result,true);
			RippleoffersexercisedStore.emitChange(action.result,"true");
			// RippleoffersexercisedStore.emitChange(action.result); 
			break;
  	}


  	
  	return true;

});


module.exports = RippleoffersexercisedStore;