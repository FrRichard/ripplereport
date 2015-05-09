var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _RippleInfos = {};


function registerInfo(result) {

	var infos = result.toJSON();

	_.each(infos, function(info) {
		_RippleInfos[info.id] = info;
		_RippleInfos[info.id].infos = [{
			address: info.account_data.Account,
			id: info.id,
		}];
	});
	console.log("_RippleInfosStore",_RippleInfos);
	// console.log("REGISTERINFO_result",result);
};

var RippleinfosStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _RippleInfos;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleInfos[key];
		return res;
	},

	emitChange: function(result) {
		var self=this;
		var addresses = result.toJSON();
		_.each(addresses, function(address) {
			self.emit(address.id);
		});
	},

	emitEvent: function(event) {
		this.emit(event);
	},

	addChangeListener: function(address,callback) {
		this.on(address, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});


RippleinfosStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;
 
  	switch(action.actionType) {
  		 case Constants.ActionTypes.ASK_RIPPLEINFOS:	
  		 	registerInfo(action.result); 	
  		 	console.log("==========+++> INFOSSTORE has been REGISTERED");
  		 	RippleinfosStore.emitChange(action.result); 		
  		 	break;
  		 case Constants.ActionTypes.RIGHTADDRESS_INFOS:
			console.log("=========+++> EMITING RIGHT from INFOSSTORE");
			RippleinfosStore.emitEvent("rightaddress_frominfosstore");
			break;
		case Constants.ActionTypes.WRONGADDRESS_INFOS:
			console.log("=========+++> EMITING RIGHT from INFOSSTORE");
			RippleinfosStore.emitEvent("wrongaddress_frominfosstore");
			break;
  	}


  	
  	return true;

});


module.exports = RippleinfosStore;