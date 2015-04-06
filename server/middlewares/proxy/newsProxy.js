var request = require('request');

function NewsProxy(params) {
	this.app = params.app;
	this.newsProxyHost = params.newsProxyHost;
};

NewsProxy.prototype.init = function(callback) {
	var self = this;
	this.app.all('/news/*', function(req, res) {
		var options = {
			method: req.method,
			url: self.newsProxyHost + req.url,
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

module.exports = NewsProxy;