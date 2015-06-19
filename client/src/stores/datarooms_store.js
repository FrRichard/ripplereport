var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _Datarooms = [];


function addDataroom(dataroom) {
	if(!_Datarooms['current']) {
		_Datarooms['current'] = null;
	}
	if(!_Datarooms['all']) {
		_Datarooms['all'] = [];
	}
	_Datarooms['all'].push(dataroom);
	_Datarooms['current'] = dataroom;
	console.log('dataroomStore(current pair update)', _Datarooms['current']);
};

function registerRipplePairs(pairs) {
	var pairs = JSON.parse(pairs);
	if(!_Datarooms['pairs']) {
		_Datarooms['pairs'] = null;
	}

	_Datarooms['pairs'] = pairs;
	console.log('dataroomStore(available pairs update', _Datarooms['pairs']);
}

var DataroomsStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _Grids;
	},

	getSpecific:function(key) {
		if(!_Datarooms[key]) {
			_Datarooms[key] = [];
		}
		var res = [];
		res[key]= _Datarooms[key];
		return res;
	},

	getConf: function(conf) {
		res = _Grids[conf];
		return res;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	

});


Dispatcher.register(function(payload) {
	var action = payload.action;
  	var result;

  	switch(action.actionType) {

  		case Constants.ActionTypes.REGISTER_DATAROOMS:
  		 	addDataroom(action.result);
  			DataroomsStore.emitChange();
  		 	break;

  		case Constants.ActionTypes.REGISTER_RIPPLEPAIRS:
  		 	registerRipplePairs(action.result);
  			DataroomsStore.emitChange();
  		 	break;
  	}


  	return true;
});


module.exports = DataroomsStore;