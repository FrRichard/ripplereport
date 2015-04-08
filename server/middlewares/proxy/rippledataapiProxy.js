var request = require('request');

function RippledataapiProxy(params) {
	this.app = params.app;
	this.rippledataapiProxyHost = params.rippledataapiProxyHost;
	this.datacalcul = params.datacalcul;
};

RippledataapiProxy.prototype.init = function(callback) {
	var self = this;

	this.app.get('/ripple/dataapi/exchange_rates/*',function(req,res) {
		var parameters = req.query.pairs;
		var options = {
			method: 'POST',
			url: self.rippledataapiProxyHost.exchange_rates,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body:parameters
		}; 

		var callback = function(error, response, body) {
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong');
			} 			
			res.status(response.statusCode).send(body);
		};

		request(options, callback);
	});

	this.app.get('/ripple/dataapi/issuer_capitalization/*', function(req,res) {
		var parameters = req.query.issuer;
		var options = {
			method: 'POST',
			url: self.rippledataapiProxyHost.issuer_capitalization,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body:parameters
		};

		var callback = function(error, response, body) {
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong');
			}
			res.status(response.statusCode).send(body);
		}
		request(options, callback);

	});

	this.app.get('/ripple/dataapi/account_offers_exercised/*', function(req,res) {
		var parameters = req.query.account;
		var options = {
			method: 'POST',
			url: self.rippledataapiProxyHost.account_offers_exercised,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body:parameters

		};

		var callback = function(error, response, body) {
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong');
			}
			var rippleoffersexercised = new self.datacalcul.rippleoffersexercised;

			try {
				var data = JSON.parse(body);
			} catch(e) {
				console.log("api is taking too long !",body,e);
				var datas = "error!";
			}
			try { var datas = rippleoffersexercised.calculate(data); } catch(e) { console.log("it's not gonna calculate  !",e)}
			// console.dir(data);
			res.status(response.statusCode).send(datas);
		}
		request(options, callback);

	});

	this.app.get('/ripple/dataapi/account_transactions/*', function(req,res) {
		var parameters = req.query.account;
		var options = {
			method: 'POST',
			url: self.rippledataapiProxyHost.account_transactions,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body:parameters 
		};

		var callback = function(error, response, body) {
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong');
			}

			var rippletransactions = new self.datacalcul.rippletransactions;
			try {
				var data = JSON.parse(body);
				var datas = rippletransactions.calculate(data);
			} catch(e) {
				console.log("api is taking too long !",e);
				var datas = "errors!!!";
			}

			res.status(response.statusCode).send(datas);

		}
		request(options, callback);

	});

	this.app.get('/ripple/dataapi/account_transaction_stats/*', function(req,res) {
		var parameters = req.query.account;
		var options = {
			method: 'POST',
			url: self.rippledataapiProxyHost.account_transaction_stats,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body:parameters 
		};

		var callback = function(error, response, body) {
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong');
			}
			res.status(response.statusCode).send(body);
		}
		request(options, callback);

	}); 

	this.app.get('/ripple/dataapi/market_traders/*', function(req,res) {
		var parameters = req.query.params;
		var options = {
			method: 'POST',
			url: self.rippledataapiProxyHost.market_traders,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body:parameters 
		};

		var callback = function(error, response, body) {
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong');
			}
			// res.status(response.statusCode).send(body);
			console.log(body);
		}
		request(options, callback);

	});


	if(callback) {
		callback();
	}

}

module.exports = RippledataapiProxy;