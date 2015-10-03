var request = require('request');
var Remote = require('ripple-lib').Remote;

function RippleaccountProxy(params) {
	var self = this;
	this.app = params.app;
	this.rippleaccountProxyHost = params.rippleaccountProxyHost;
	this.remoteServer = params.rippleaccountRemoteServer;
	this.restServer = params.restServer;
	this.remote = new Remote({
			servers: [ self.remoteServer ]
		});
	this.remote.connect(function() { 
			console.log("Connected to : " + self.remoteServer);
		});
};

RippleaccountProxy.prototype.init = function(callback) {
	var self = this;
	this.app.all('/ripple/id/*', function(req, res) {
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
				var glup = body;
				var body = JSON.parse(body);
			} catch(e) {
				console.log("API sent something unexcepected",e,body,glup);
			}
	
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong')
			} 
			try {
				res.status(response.statusCode).send(body);
			} catch(e) {
				console.log(e);
			}
		};
		request(options, callback);
	});

	this.app.all('/ripple/account_info/*', function(req, res) {

		// var remote = new Remote({
		// 	servers: [ self.remoteServer ]
		// });
		// remote.connect(function() { 
		// 	console.log("Connected to : " + self.remoteServer);
		// });
	console.log("REMOTE account_infos!!:!!",self.remote);
		var parameters = { account: req.query.id };
		self.remote.request("account_info",parameters, function(err, acc) {
			if(err) {
				console.log("acount_info_error",err.remote.error);
				res.send(err);
			} else {
				res.send(acc);
			}
		});

	
	});
	
	this.app.all('/ripple/account_lines/*', function(req, res) {

		// var remote = new Remote({
		// 	servers: [ self.remoteServer ]
		// });
		// remote.connect(function() { 
		// 	console.log("Connected to : " + self.remoteServer);
		// });
		// console.log("ROMOTE ACCOUNT8OKLINES",remote);
		var parameters = { account: req.query.id };
		self.remote.request("account_lines",parameters, function(err, acc) {
			res.send(acc);
		});

	
	});

	this.app.all('/ripple/account_offers/*', function(req, res) {

		// var remote = new Remote({
		// 	servers: [ self.remoteServer ]
		// });
		// remote.connect(function() {
		// 	console.log("Connected to : " + self.remoteServer);
		// });
	// console.log("REMOTE ACCOUNT_OFFERS", remote) ;
		var parameters = { account: req.query.id };

		self.remote.request("account_offers", parameters, function(err, acc) {
			res.send(acc);
		});
	});


	this.app.get('/ripple/gateway_balances/*', function(req, res) {
		var qs = req.query.params;	
		var options = {
			method: "POST",
			url: self.restServer,
			body: qs,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
		};
		var callback = function(error, response, body) {
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong')
			} else {
				res.status(response.statusCode).send(body);
			}
		}; 
		request(options, callback);
	});
	
	if (callback) {
		callback();
	}
};

module.exports = RippleaccountProxy;