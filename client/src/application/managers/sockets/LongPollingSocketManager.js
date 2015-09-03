var io = require('socket.io-client');


var instance = null;

var SocketManager = function() {
	if(instance !== null) {
		throw new Error("Cannont instantiate more than one SocketManager, use SocketManager.getInstance()");
	}
}


SocketManager.getInstance = function() {


	var full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

	if(instance === null) {
		instance = io(full+'/longpolling');
        

        instance.on('connect', function() {
        });

        instance.on('disconnect', function() {
        });

		return instance;

	}


}

module.exports = SocketManager.getInstance();