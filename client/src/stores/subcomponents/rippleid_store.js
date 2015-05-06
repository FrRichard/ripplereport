var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var LOAD_EVENT = 'load';
var _RippleIddatas = {};
var i=0;

function loadFlag(toresolves) {

	_.each(toresolves, function(toresolve,i) {
		var address = "address"+i;
		_RippleIddatas[address]={};
		_RippleIddatas[address]["loading"]=true;
	});
};

function registerId(result) {

	var addresses = result.toJSON();

	_.each(addresses, function(addr) {
		_RippleIddatas[addr.id] = addr;
		_RippleIddatas[addr.id]["loading"] = false;
		_RippleIddatas[addr.id]["raw"] = result;
	});
	
	console.log("_RippleIdStore",_RippleIddatas);
};

var RippleidStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleIddatas;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleIddatas[key];
		return res;
	},

	isLoading:function(key) {
		var res = {};
		res[key] = _RippleIddatas[key];
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

	addLoadListener: function(callback) {
		this.on(LOAD_EVENT, callback);
	},

	addChangeListener: function(address,callback) {
		this.on(address, callback);
	},

	removeChangeListener: function(event,callback) {
		this.removeListener(event, callback);
	},

	

});


RippleidStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;

  	switch(action.actionType) {
  		case Constants.ActionTypes.ASK_RIPPLEID:	
  		 	registerId(action.result);	
  		 	RippleidStore.emitChange(action.result); 		
  		 	break;

  		case Constants.ActionTypes.LOADING_GIF:
  		 	loadFlag(action.toresolves);
  		 	RippleidStore.emitLoad();
  		 	break;

  		case Constants.ActionTypes.ISLOADING:
			RippleidStore.emitLoading('isloading');
			break;

		case Constants.ActionTypes.WRONGADDRESS:
			RippleidStore.emitLoading("wrongaddress");
			break;

		case Constants.ActionTypes.RIGHTADDRESS:
			RippleidStore.emitLoading("rightaddress");
			break;
  	}

  	

  	return true;
});


module.exports = RippleidStore;