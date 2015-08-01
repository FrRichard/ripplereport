var LongPollingSocketManager = require('LongPollingSocketManager');


var PollingActions = {
	stopTransactionRequest: function(dataroom) {
		LongPollingSocketManager.emit("stop",dataroom);
	},

	stopAllTransactionRequest: function(dataroom) {
		LongPollingSocketManager.emit('stopAll');
	}

};

module.exports = PollingActions;