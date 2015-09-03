var request = require('request');
var parseurl = require('url');
var _ = require('underscore');
var moment = require('moment');
var EventManager = require('../../managers/EventManager');

function HistoricalapiProxy(params) {
	this.app = params.app;
	this.historicalapiProxyHost = params.historicalapiProxyHost;
	this.datacalcul = params.datacalcul;
	this.requestparsing = params.requestparsing;
};

HistoricalapiProxy.prototype.init = function(callback) {
	var self = this;
	this.EventManager = EventManager;
	// var allRequest = [];

	this.app.all('/ripple/historicalapi/account_transactions/*',function(req,res) {
		var allRequest = [];
		req.query.params = JSON.parse(req.query.params);
		var midself=this;
		var uuid = req.query.params.uuid;
		var address = req.query.params.account;

		var qs = { result:"tesSUCCESS" }

		_.each(req.query.params, function(param,key) {
			qs[key] = param;
		})
	
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

		var calculAndSend = function() {
			var payload = {
				msg: "stop",
				uuid: uuid,
				address: address,
				room: 'payment'
			}
			if(midself.request) {
				// console.log("ABOOOOOOOOOOOOOOOOORRRRRTTTT",allRequest.length,midself.request.href);
				_.each(allRequest, function(thisRequest,i) {
					console.log("ABORT THIS"+i+":",thisRequest.href);
					thisRequest.abort();
				});
				// midself.request.abort();
			}
			try {
					var transactionsParsing = new self.requestparsing.account_transactions();
					var transactions = new self.datacalcul.transactions();
					var result = transactionsParsing.parse(fetched,address);
					result = transactions.calculate(result);
					result['period'] = "custom";
					result['recur'] = false;
					if(!res.headersSent) {
						res.send(result);
					}
			} catch(e) {
					console.log("API sent something unexcepected FROM THE BLOP",e);
					try {
						// res.end(e);
						var result = e;
						e['recur'] = false;
						if(!res.headersSent) {
							console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",e);
							res.send(e);
						}
					} catch(e) {
						console.log("calculandsendSTOP_ERROR",e);
					}
			}

			EventManager.emit("payment",payload);
			EventManager.removeListener('stop'+uuid, calculAndSend);
			// try {
				// console.log(result,"ahhahah");
				// res.send(result);
			// } catch(e) {
			// 	console.log("calculandsendSTOP_ERROR",e);
			// }
		};

		EventManager.on('stop'+uuid, calculAndSend);	

		// console.log("EVENT MANAGER !!!",EventManager);

		// EventManager.on('stopAll', function() {
		// 	_.each(allRequest, function(r) {
		// 		r.abort();
		// 	});
		// });

		var callback = function(error, response, body) {
			try {
				var data = JSON.parse(body);
				_.each(data.transactions, function(t){
					fetched.transactions.push(t);
				});
			} catch(e) {
				console.log("Error at PARSE BODY:",e,body);
			}

			var calcul = function(period) {
				try {
					var transactionsParsing = new self.requestparsing.account_transactions();
					var transactions = new self.datacalcul.transactions();
					var result = transactionsParsing.parse(fetched,address);
					result = transactions.calculate(result);
					result['period'] = period;
				} catch(e) {
					console.log("API sent something unexcepected",e,body,address);
					// send(e);
					var result = e;
				}
				if (error) {
					console.log('error', error);
					// res.send(500, 'something went wrong')
				} 

				return result;
			}
			var send = function(result) {
				var payload = {
					msg: "Fetched",
					uuid: uuid,
					address: address,
					room: 'payment'
				}
				EventManager.emit("payment",payload);
				EventManager.removeListener('stop'+uuid, calculAndSend);
				// console.log("HEADER SET ......... ?", res.headersSent,res);
				if(!res.headersSent) {
					res.status(response.statusCode).send(result);
				}
				// try {
				// } catch(e) {
				// 	console.log(e);
				// 	res.send(e);
				// }
				// console.log("SEND!",address,EventManager);
			}

			if(data && data.transactions) {
				if(data.transactions.length == 1000) {
					i +=1000; 
					qs.offset = i;
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
					var payload = {}
					payload.msg = i + " transactions has been filtered and analyzed";
					payload['room'] = 'payment';
					payload['uuid'] = uuid;
					payload['date'] = {
						from: data.transactions[0].date,
						to:  data.transactions[999].date
					}
					// console.log(payload);
					EventManager.emit("payment",payload);
			
					console.log(i + "transactions has been filtered and analyzed (" + address +")");
					if(!qs.start && qs.period!='all') {
						console.log("send the result with 'tx' period");
						var result = calcul('tx');
						send(result);
					} else {
						// console.log("ALLLLLLLREQUEEESSST",allRequest);
						//midself.request = request(options,callback);
						//allRequest.push(midself.request);
						var result = calcul('1000');
						send(result);
					} 

				} else {
					if(!qs.period) {		
						var result = calcul('all');
					} else {
						var result = calcul(qs.period);
					}
					// console.log(result);
					send(result);
				}
			}

		};
		
		try {
			midself.request = request(options, callback);
			allRequest.push(midself.request);
			// console.log("ALLLLLLLREQUEEESSST",allRequest,allRequest.length);
			var payload = {
				msg: "Fetching",
				uuid: uuid,
				address: address,
				room: 'payment'
			}
			EventManager.emit("payment",payload);
		} catch(e) {
			console.log(e);
		}

		// EventManager.on('stop'+uuid, function() {
		// 	currentReq.abort();
		// });

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
				console.log("API sent something unexcepected",e,body);
			}
	
			if (error) {
				console.log('error', error);
				res.send(500, 'something went wrong')
			} 

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