var Constants = require('Constants');
var Dispatcher = require('Dispatcher');
var RippleSocketManager = require('RippleSocketManager');
var RippleTradeStore = require('RippleTradeStore');
var DataroomsStore = require('DataroomsStore');


var RealtimeActions = {

	connectToRippleTrades: function(params) {
		// newTrades(params)
		//Trade.fetch onsuccess 
			// payload  = datasocketmanager.getLast(room.id) then dispatch

		// var collection = new rippletrades();
		// collection.getExchangerates(accountslines,range).then(function() {

		// 	Dispatcher.handleViewAction({
		// 		actionType: Constants.ActionTypes.ASK_RIPPLEEXCHANGERATES,
		// 		result: collection
		// 	});
		
		// });
	},

	connectToRippleTrade: function(params) {
	
	},

	updateTradeStore: function(payload) {
		var payload = [payload];
		Dispatcher.handleViewAction({
			actionType: Constants.ActionTypes.ASK_TRADE,
			result: payload
		});	
	},

	// update/connectToRippleTrades

 	clearDatarooms: function(dataRooms, params) {
        // var self = this;
        // var item = params.item,
        //     currency = params.currency;
        // _.each(this.datarooms, function(dataroom) {
        //     if (dataRooms.indexOf(dataroom) === -1 || (dataroom.indexOf(item) != -1 && dataroom.indexOf(currency) != -1)) {
        //         DataSocketManager.emit('leave-dataroom', dataroom);
        //     }
        // });

    },

    joinDataroom: function(params) {
        var self = this;
        // var dataRooms = ParametersManager.getTickerRoom(params);
        // this.clearDatarooms(dataRooms, params);

        var sep = ':';
        var dataroom = params.item + sep + params.currency;
        var item = params.item,
            currency = params.currency;
        // RippleSocketManager.once('roomlist', function(roomlist) {
        //     console.log(roomlist);
        // });
        // _.each(dataRooms, function(pair) {
        //     dataroom = pair;
        //     if (self.datarooms.indexOf(dataroom) === -1 ||  (dataroom.indexOf(item) != -1 && dataroom.indexOf(currency) != -1)) {
                RippleSocketManager.emit('enter-dataroom', dataroom);
                // console.log('enter dataroom ok', dataroom);
            // }
        // });

		// RippleSocketManager.on('disconnect', function(dataroom) {
		// 	RippleSocketManager.emit('enter-dataroom', dataroom);
		// });

		RippleSocketManager.on('enter-dataroom',function(payload) {
			console.log("ENTER-DATAROOM================================++>",payload);
		});


    },

    registerDataroom: function() {
        this.registerAvailablePairs();
    	RippleSocketManager.once('enter-dataroom', function(response) {
            if (response.error) console.log('ENTER DATAROOM ERROR : ', response.error);
            else {
            	var datarooms = DataroomsStore.getSpecific('current');
                if (datarooms.indexOf(response.dataroom) === -1) {
                    Dispatcher.handleViewAction({
						actionType: Constants.ActionTypes.REGISTER_DATAROOMS,
						result: response.dataroom
					});
			        // console.log('enter dataroom ok ', response.dataroom);
                    // console.log('ENTER DATAROOMS ', self.datarooms);
                }
            }
        });
    },

    registerAvailablePairs: function() {
        RippleSocketManager.emit('ripplePairs');
        RippleSocketManager.on('ripplePairs', function(pairs) {
            Dispatcher.handleViewAction({
                        actionType: Constants.ActionTypes.REGISTER_RIPPLEPAIRS,
                        result: pairs
            });
        });

    }



};




module.exports = RealtimeActions;