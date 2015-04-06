var events = require('events');
var util = require('util');
var io = require('socket.io');
var _ = require('underscore');

function AbstractSocket(params) {
	events.EventEmitter.call(this);
	this.params = params;
	this.io = io;
};

_.extend(AbstractSocket,events.EventEmitter);

AbstractSocket.prototype.run = function(){
	var self = this;
	var port = params.port || 9091;
	this.io.listen(params.port);
    this.io.sockets.on('connection', function(socket) {
    	self.initServices(socket);
    });
};

AbstractSocket.prototype.initServices = function(socket){
	console.log('AbstractSocket.initServices must be overidden!');
};

module.exports = AbstractSocket;