var io = require('socket.io-client');


var instance = null;

var SocketManager = function() {
	if(instance !== null) {
		throw new Error("Cannont instantiate more than one SocketManager, use SocketManager.getInstance()");
	}
}


SocketManager.getInstance = function() {
	if(instance === null) {
		var full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
		instance = io(full+'/rippletrade');
		return instance;

	}


}

module.exports = SocketManager.getInstance();