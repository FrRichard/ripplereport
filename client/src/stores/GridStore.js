var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _Grids = {};


function registercurrentref(gridster) {
	_Grids['current'] = gridster;
};

function registerconf(conf) {
	_Grids['currentconf'] = conf;
};

var GridStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _Grids;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _Grids[key];
		return res;
	},

	getKeyfactsNumber: function() {
		var res = _Grids['current'].$widgets.length;
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

  		 case Constants.ActionTypes.REGISTER_CURRENTREFGRID:
  		 	registercurrentref(action.result);
  		 	break;

  		 case Constants.ActionTypes.REGISTER_CONF:
  		 	registerconf(action.result);
  			GridStore.emitChange();
  		 	break;
  	}


  	return true;
});


module.exports = GridStore;