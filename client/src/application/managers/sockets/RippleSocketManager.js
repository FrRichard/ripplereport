var io = require('socket.io-client');


var instance = null;

var SocketManager = function() {
	if(instance !== null) {
		throw new Error("Cannont instantiate more than one SocketManager, use SocketManager.getInstance()");
	}
}


SocketManager.getInstance = function() {
	if(instance === null) {
		instance = io('http://localhost:9080/rippletrade');
		return instance;

	}


}

module.exports = SocketManager.getInstance();