var request = require('request');
var parseurl = require('url');
var _ = require('underscore');
var moment = require('moment');

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
		var address = req.query.params.account;

		var qs = { result:"tesSUCCESS" }

		_.each(req.query.params, function(param,key) {
			qs[key] = param;
		})
		console.log("qsssssssss",qs,"adddresssssssss",address);
		var options = {
			method: 'GET',
			qs: qs,
			rejectUnauthorized: false,
			url: self.historicalapiProxyHost +"accounts/" + address +"/transactions",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			}

		};
		
		var i = 0;

		var fetched = {
			transactions: []
		}

		var callback = function(error, response, body) {
			
			var data = JSON.parse(body);
			_.each(data.transactions, function(t){
				fetched.transactions.push(t);
			});

			var calcul = function(period) {
				try {
					var transactionsParsing = new self.requestparsing.account_transactions();
					var transactions = new self.datacalcul.transactions();
					var result = transactionsParsing.parse(fetched,address);
					result = transactions.calculate(result);
					result['period'] = period;
				} catch(e) {
					console.log("API sent something unexcepected",e);
					send(e);
				}
				if (error) {
					console.log('error', error);
					res.send(500, 'something went wrong')
				} 

				return result;
			}
			var send = function(result) {
				res.status(response.statusCode).send(result);
			}

			if(data) {
				if(data.transactions.length == 1000) {
					i +=1000;
					qs.offset = i;
					// qs['start'] = moment().subtract(90,'days').format('YYYY-MM-DDThh:mm');
					console.log(qs);
					var options = {
							method: 'GET',
							qs: qs,
							rejectUnauthorized: false,
							url: "https://history.ripple.com/v1/" +"accounts/" + address +"/transactions",
							headers: {
								"Content-Type": "application/json",
								"Accept": "application/json"
							}
					}

					console.log(i + "transactions has been filtered and analyzed (" + address +")");
					if(!qs.start) {
						console.log("send this thistpgepo");
						var result = calcul('tx');
						send(result);
					} else {
						request(options,callback);
					}

				} else {
					if(!qs.period) {		
						var result = calcul('all');
					} else {
						var result = calcul(qs.period);
					}

					send(result);
				}
			}

		};
		
		try {
			request(options, callback);
		} catch(e) {
			console.log(e);
		}
	});

	this.app.all('/ripple/historicalapi/transactions/*',function(req,res) {
		req.query.params = JSON.parse(req.query.params);

		var options = {
			method: 'GET',
			qs: {type: "Payment", result:"tesSUCCESS", limit:1000},
			rejectUnauthorized: false,
			url: self.historicalapiProxyHost +"transactions/" + req.query.params.txhash ,
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			}

		};
		var callback = function(error, response, body) {

			try {
				var data = JSON.parse(body);
				// var transactionsParsing = new self.requestparsing.account_transactions();
				// var transactions = new self.datacalcul.transactions();
				// var datas = transactionsParsing.parse(data,req.query.params.account);
				// var data = transactions.calculate(datas);
			} catch(e) {
				console.log("API sent something unexcepected",e);
			}
	
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong')
			} 
			console.log("STATUSCOOOOOOOOOOOODE",response.statusCode);
			if(response.statusCode == 400) {
				data = {message:'invalid format', result:'error'};
			}
			//  else if(response.statuscode == 404) {
			// 	data = {error:'no_exist'};
			// }

			res.status(200).send(data);
		};
		
		try {
			request(options, callback);
		} catch(e) {
			consoole.log("request error",e);
		}
	});


	if(callback) {
		callback();
	}

}

module.exports = HistoricalapiProxy;