var config = require('Config');
var RealtimeActions = require('RealtimeActions');
var RippleSocketManager = require('RippleSocketManager');


var Trade = Backbone.Model.extend({

	initialize: function(params) {
		this.params = params;
		RippleSocketManager.once('connect', function (socket) {
			console.log("CONNECTED TO /rippletrade SOCKET");

		});
		this.test = [];
	},

	socketSync: function(params) {
		var self = this;
		this.params = params || this.params || {};

		//remove old event listener (get old props & remove)
		var updateCallback = function(payload) {
			
			// console.log("oooooooooooooouuuuuuh LE PAYLOAD",payload);
			self.test.push(payload.data);
			console.log("MODEL_UPDATE",self.test);
		    var objTrade = payload.data;
		    // if(objTrade.volumeitem != 0) {
		    	self.update(objTrade);
		    // }
		    console.log("THIS!",self);
		};
		//   var eventId
		if (this.isListening) {

			eventId = this.eventIdUpdate('ASK');
			console.log("REMOVE_MODEL_LISTENER",eventId);
			// RippleSocketManager.removeAllListeners(eventId,function(id) {
			// 	console.log("REMOVE FUCKING LISTENRET",id);
			// });
			delete RippleSocketManager._callbacks[eventId];

			eventId = this.eventIdUpdate('BID');
			console.log("REMOVE_MODEL_LISTENER",eventId);
			// RippleSocketManager.removeAllListeners(eventId,function(id) {
			// 	console.log("REMOVE FUCKING LISTENRET",id);
			// });
			delete RippleSocketManager._callbacks[eventId];

		}
		this.set('platform', this.params.platform);
		this.set('currency', this.params.currency);
		this.set('item', this.params.item);
		// this.set('type', this.params.type);
		// SET NEW LISTENER
		RippleSocketManager.once('enter-dataroom', function(payload) {
			console.log("model====> enterdatarooom",payload);
			if(payload.isReversed == false) {
				var eventId = self.eventIdUpdate('ASK');
				RippleSocketManager.on(eventId, updateCallback);
				console.log("MODEL_CURRENT_LISTENER",eventId);
				eventId = self.eventIdUpdate('BID');
				RippleSocketManager.on(eventId, updateCallback);
				console.log("MODEL_CURRENT_LISTENER",eventId);
			} else {
				var eventId = self.eventIdUpdate('ASK',true);
				RippleSocketManager.on(eventId, updateCallback);
				eventId = self.eventIdUpdate('BID',true);
				RippleSocketManager.on(eventId, updateCallback);
			}

		});

		this.isListening = true;
		// console.log("SOOOOOOOOOOOOOOOOOOOOOOOOOOOCKKKKKKKKKKKKKKKKKEEEEEEEEEEEEEETTTTTTTTTTTTT SYYYYYYYYYYYYYYYYYYYYNNNNNC",RippleSocketManager);

	},


	update: function(payload) {
		var self = this;
		if(payload) {
			console.log("UPDATE_MODEL ========================>",payload);
			this.set('type', payload.type);
			this.set('price', payload.price);
			this.set('volumeitem', payload.volumeitem);
			this.set('volumecurrency', payload.volumecurrency);
			RealtimeActions.updateTradeStore(payload);
		}

	},

	eventIdUpdate: function(type,reversed) {
		var sep = ":";
		if(reversed) {
			var eventId = this.get('platform') + sep + this.get('currency') + sep + this.get('item') + sep + type; 
		} else  {
			var eventId = this.get('platform') + sep + this.get('item') + sep + this.get('currency') + sep + type;
		}

		return eventId;
	},

	toString: function() {
		// ?
	}


});

module.exports = Trade;