var request = require('request');

function RealtimeProxy(params) {
	this.app = params.app;
	
};

RealtimeProxy.prototype.init = function(callback) {
	var self = this;

	


	if(callback) {
		callback();
	}

}

module.exports = RealtimeProxy;