var request = require('request');
var Remote = require('ripple-lib').Remote;

function RippleaccountProxy(params) {
	this.app = params.app;
	this.rippleaccountProxyHost = params.rippleaccountProxyHost;
	this.remoteServer = params.rippleaccountRemoteServer;
};

RippleaccountProxy.prototype.init = function(callback) {
	var self = this;
	this.app.all('/ripple/id/*', function(req, res) {
		// console.log('api proxy : ' + self.apiProxyHost + req.url);
		
		var options = {
			method: req.method,
			url: self.rippleaccountProxyHost + req.query.id,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			}

		};
		var callback = function(error, response, body) {
			try {
				var body = JSON.parse(body);
			} catch(e) {
				console.log("API sent something unexcepected",e);
			}
	
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong')
			} 
		
			res.send(response.statusCode, body);
		};
		request(options, callback);
	});

	this.app.all('/ripple/account_info/*', function(req, res) {

		var remote = new Remote({
			servers: [ self.remoteServer ]
		});
		remote.connect(function() { 
			console.log("Connected to : " + self.remoteServer);
		});
		var parameters = { account: req.query.id };
		remote.request("account_info",parameters, function(err, acc) {
			if(err) {
				console.log("acount_info_error",err);
			}

			res.send(acc);
		});

	
	});
	
	this.app.all('/ripple/account_lines/*', function(req, res) {

		var remote = new Remote({
			servers: [ self.remoteServer ]
		});
		remote.connect(function() { 
			console.log("Connected to : " + self.remoteServer);
		});
		var parameters = { account: req.query.id };
		remote.request("account_lines",parameters, function(err, acc) {
			res.send(acc);
		});

	
	});

	this.app.all('/ripple/account_offers/*', function(req, res) {

		var remote = new Remote({
			servers: [ self.remoteServer ]
		});
		remote.connect(function() {
			console.log("Connected to : " + self.remoteServer);
		});
		var parameters = { account: req.query.id };

		remote.request("account_offers", parameters, function(err, acc) {
			res.send(acc);
		});
	});

	if (callback) {
		callback();
	}

};

module.exports = RippleaccountProxy;