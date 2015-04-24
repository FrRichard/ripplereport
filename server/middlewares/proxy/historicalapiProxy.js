var request = require('request');
var parseurl = require('url');

function HistoricalapiProxy(params) {
	this.app = params.app;
	this.historicalapiProxyHost = params.historicalapiProxyHost;
	this.datacalcul = params.datacalcul;
	this.requestparsing = params.requestparsing;
};

HistoricalapiProxy.prototype.init = function(callback) {
	var self = this;

	this.app.all('/ripple/historicalapi/account_transactions/*',function(req,res) {
		req.query.params = JSON.parse(req.query.params);

		var options = {
			method: 'GET',
			qs: {type: "Payment", result:"tesSUCCESS", limit:1000},
			rejectUnauthorized: false,
			url: self.historicalapiProxyHost +"accounts/" + req.query.params.account +"/transactions",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			}

		};
		var callback = function(error, response, body) {

			try {
				var data = JSON.parse(body);
				var transactionsParsing = new self.requestparsing.account_transactions();
				var transactions = new self.datacalcul.transactions();
				var datas = transactionsParsing.parse(data,req.query.params.account);
				var data = transactions.calculate(datas);
			} catch(e) {
				console.log("API sent something unexcepected",e);
			}
	
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong')
			} 
			// console.log(body);
			res.status(response.statusCode).send(data);
		};
		
		try {
			request(options, callback);
		} catch(e) {
			consoole.log(e);
		}
	});

	if(callback) {
		callback();
	}

}

module.exports = HistoricalapiProxy;