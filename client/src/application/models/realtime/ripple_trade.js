var config = require('config');
var RealtimeActions = require('RealtimeActions');
var RippleSocketManager = require('RippleSocketManager');


var Trade = Backbone.Model.extend({

	initialize: function(params) {
		this.params = params;
	},

	socketSync: function(params) {

		var self = this;
		this.params = params || this.params || {};

		// var tradeSocket = io.connect('http://localhost:9090/rippletrade');
		RippleSocketManager.on('connect', function (socket) {
			console.log("CONNECTED TO /rippletrade SOCKET");

		});

		// RippleSocketManager.on('TEST', function(data) {
		// 	console.log("fromTrade_socket",data);
		// });

		//remove old event listener (get old props & remove)
		var updateCallback = function(payload) {
			
			// payload.data = JSON.parse(payload.data);

		    var objTrade = payload.data;
		    self.update(objTrade);
		 };
		//   var eventId
		//   if (this.isListening) {

		//       eventId = this.eventIdUpdate();
		//       console.log(eventId);
		//       DataSocketManager.removeAllListeners(eventId);
		//   }
		this.set('platform', this.params.platform);
		this.set('currency', this.params.currency);
		this.set('item', this.params.item);
		// this.set('type', this.params.type);
		// SET NEW LISTENER
		RippleSocketManager.on('enter-dataroom', function(payload) {
			if(payload.isReversed == false) {
				var eventId = self.eventIdUpdate('ASK');
				RippleSocketManager.on(eventId, updateCallback);
				eventId = self.eventIdUpdate('BID');
				RippleSocketManager.on(eventId, updateCallback);
			} else {
				var eventId = self.eventIdUpdate('ASK',true);
				RippleSocketManager.on(eventId, updateCallback);
				eventId = self.eventIdUpdate('BID',true);
				RippleSocketManager.on(eventId, updateCallback);
			}

		});

		// this.isListening = true;

	},


	update: function(payload) {
		var self = this;
		if(payload) {
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