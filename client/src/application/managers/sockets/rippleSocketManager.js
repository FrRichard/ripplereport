var io = require('socket.io-client');


var instance = null;

var SocketManager = function() {
	if(instance !== null) {
		throw new Error("Cannont instantiate more than one SocketManager, use SocketManager.getInstance()");
	}
}

SocketManager.prototype.joinDataroom = function(params) {
    // var self = this;
    // var sep = ':';
    // var dataroom = params.item + sep + params.currency;
    // var dataRooms = ParametersManager.getTickerRoom(params);
    // this.clearDatarooms(dataRooms, params);
    // var item = params.item,
    //     currency = params.currency;
    // DataSocketManager.once('roomlist', function(roomlist) {
    //     console.log(roomlist);
    // });
    // _.each(dataRooms, function(pair) {
    //     dataroom = pair;
    //     if (self.datarooms.indexOf(dataroom) === -1 ||  (dataroom.indexOf(item) != -1 && dataroom.indexOf(currency) != -1)) {
    //         DataSocketManager.emit('enter-dataroom', dataroom);
    //         // console.log('enter dataroom ok', dataroom);
    //     }
    // });

}

SocketManager.getInstance = function() {
	if(instance === null) {
		instance = io('http://localhost:9090/rippletrade');
        // instance = io('/rippletrade');

		return instance;

		instance.on('connect', function() {
		    console.log('ripple_data socket connected!')
		});

		instance.on('disconnect', function() {
		    console.log('ripple_data socket disconnected!')
		});


	}


}

module.exports = SocketManager.getInstance();