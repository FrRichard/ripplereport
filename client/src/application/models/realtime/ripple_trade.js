var config = require('config');

var RippleSocketManager = require('RippleSocketManager');

var Trade = Backbone.Model.extend({

	initialize: function(params) {
		this.params = params;
	},

	socketSync: function(params) {
		var self = this;
		this.params = params || this.params || {};
		console.log("SOCKETSYNC!");
		// var tradeSocket = io.connect('http://localhost:9090/rippletrade');
		console.log(RippleSocketManager);
		RippleSocketManager.on('connect', function (socket) {
			console.log("CONNECTED TO /rippletrade SOCKET");

		});

		RippleSocketManager.on('TEST', function(data) {
			console.log("fromTrade_socket",data);
		});

		//remove old event listener (get old props & remove)
		// var updateCallback = function(payload) {
		//       var objTrade = payload.data;
		//       self.update(objTrade);
		//   };
		//   var eventId
		//   if (this.isListening) {

		//       eventId = this.eventIdUpdate();
		//       console.log(eventId);
		//       DataSocketManager.removeAllListeners(eventId);
		//   }
		this.set('platform', this.params.platform);
		this.set('currency', this.params.currency);
		this.set('item', this.params.item);
		this.set('type', this.params.type);
		// SET NEW LISTENER
		//var eventId = this.eventIdUpdate();
		// DataSocketManager.on(eventId, updateCallback);
		// this.isListening = true;

	},


	update: function(trade) {
		if(trade) {
			// console.log("NEW TRADE!!!!",trade);
			// SET SERVER DATA PROPS ANSWER (amount, price, date...)
			// Trigger update
			// Real_timeACTIONS.updateTrade()
		}

	},

	eventIdUpdate: function() {
		var sep = ":";
		var eventId = this.get('platform') + sep + this.get('item') + sep + this.get('currency') + sep + this.get('type');
		return eventId;
	},

	toString: function() {
		// ?
	}


});

module.exports = Trade;