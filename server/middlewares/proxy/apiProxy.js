var request = require('request');

function ApiProxy(params) {
	this.app = params.app;
	this.apiProxyHost = params.apiProxyHost;
};

ApiProxy.prototype.init = function(callback) {
	var self = this;
	this.app.all('/api/*', function(req, res) {
		// console.log('api proxy : ' + self.apiProxyHost + req.url);
		// console.log('body : ' + JSON.stringify(req.body));
		var options = {
			method: req.method,
			url: self.apiProxyHost + req.url,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify(req.body)
		};
		var callback = function(error, response, body) {
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong')
			} else {
				res.send(response.statusCode, body);
			}
		};
		request(options, callback);
	});

	if (callback) {
		callback();
	}

};

module.exports = ApiProxy;