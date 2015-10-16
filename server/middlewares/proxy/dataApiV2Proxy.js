var request = require('request');
var parseurl = require('url');
var _ = require('underscore');
var moment = require('moment');

function DataApiV2Proxy(params) {
	this.app = params.app;
	this.dataapiV2ProxyHost = params.dataapiV2ProxyHost;
};

DataApiV2Proxy.prototype.init = function(callback) {
	var self = this;

	this.app.get('/ripple/dataapiV2/reports/*',function(req,res) {
		var parameters = JSON.parse(req.query.account);
		console.log("DATA API REPORTS§", parameters.account, self.dataapiV2ProxyHost);

		var qs = {
			start: parameters.start,
			end: parameters.end,
			accounts: true
		}

		var options = {
			method: 'GET',
			qs: qs,
			rejectUnauthorized: false,
			url: self.dataapiV2ProxyHost.accounts + parameters.account +"/reports",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			}
		};

		var callback = function(error, response, body) {
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong');
			}
			res.status('200').send(body);
		}
		request(options, callback);
	
	});

	if(callback) {
		callback();
	}

}

module.exports = DataApiV2Proxy;