var Constants = require('Constants');
var Dispatcher = require('Dispatcher');
var RippleSocketManager = require('RippleSocketManager');
var RippleTradeStore = require('RippleTradeStore');
var DataroomsStore = require('DataroomsStore');


var RealtimeActions = {



	updateTradeStore: function(payload) {
		var payload = [payload];
		Dispatcher.handleViewAction({
			actionType: Constants.ActionTypes.ASK_TRADE,
			result: payload
		});	
	},


    leaveDataroom: function(params) {
        var sep = ":";
        var dataroom = params.item + sep + params.currency;
        RippleSocketManager.emit('leave-dataroom', dataroom);
    },

    joinDataroom: function(params) {
        var self = this;
        var sep = ':';
        var dataroom = params.item + sep + params.currency;
        var item = params.item,
        currency = params.currency;
        RippleSocketManager.emit('enter-dataroom', dataroom);


		RippleSocketManager.once('enter-dataroom',function(payload) {
		});


    },

    registerDataroom: function() {    
    	RippleSocketManager.once('enter-dataroom', function(response) {
            if (response.error) {}
            else {
            	var datarooms = DataroomsStore.getSpecific('current');

                if (datarooms.indexOf(response.dataroom) === -1) {
                    Dispatcher.handleViewAction({
						actionType: Constants.ActionTypes.REGISTER_DATAROOMS,
						result: response.dataroom
					});
                }
            }
        });
    },

    registerAvailablePairs: function() {
        RippleSocketManager.emit('ripplePairs');
        RippleSocketManager.once('ripplePairs', function(pairs) {
            Dispatcher.handleViewAction({
                        actionType: Constants.ActionTypes.REGISTER_RIPPLEPAIRS,
                        result: pairs
            });
        });

    }



};




module.exports = RealtimeActions;