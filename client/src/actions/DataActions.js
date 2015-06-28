var Constants = require('Constants');
var Dispatcher = require('Dispatcher');
var rippleexchangerates = require('ExchangeRates');
var ripplemarkettraders = require('MarketTraders');
var transactions= require('Transactions');

var RippledataActions = {

	exchangerates: function(accountslines,range) {
		var range = range;

		var collection = new rippleexchangerates();
		collection.getExchangerates(accountslines,range).then(function() {

			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEEXCHANGERATES,
				result: collection
			});
		
		});
	
	},

	exchangerates_capitalization: function(caps,range) {
		//Parsing needed by the collection
		 var lines = [];
		 lines["lines"] = [];
		 lines["id"] = caps[0].id;
	     _.each(caps[0], function(cap,i) {
	     	if(i!="id") {
		        lines["lines"].push( {
		          account: cap.issuer,
		          currency:cap.currency,
		          balance:1
		        });
		    }
	     });
	     var queries = [];
	     queries[0] = lines;

		// var lines = accountinfo.attributes.lines;
		var range = range;
		var collection = new rippleexchangerates();
		collection.getExchangerates(queries,range).then(function() {
			
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEEXCHANGERATES_CAPITALIZATION,
				result: collection
			});
		});
	
	},

	markettraders: function(params,full) {
		var collection = new ripplemarkettraders();
		collection.createMarkettradersList(params,full).then(function() {

			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEMARKETTRADERS,
				result: collection
			});
		
		});
	},

	transaction: function(params) {

		var collection = new transactions("address1", params);
		Dispatcher.handleServerAction({
				actionType:Constants.ActionTypes.TX_ISLOADING
			});
		collection.createTransactionList(params).then(function() {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_TRANSACTION,
				result:collection
			});
			// Dispatcher.handleServerAction({
			// 	actionType:Constants.ActionTypes.TX_ISLOADING
			// });
		});
	}

};


module.exports = RippledataActions;