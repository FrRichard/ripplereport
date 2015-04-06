var Constants = require('Constants');
var Dispatcher = require('Dispatcher');
var rippleids =  require('rippleids');
var ripplelines = require('ripplelines');
var rippleinfos = require('rippleinfos');
var ripplecapitalizations = require('ripplecapitalizations');
var rippleoffersexercised =  require('rippleoffersexercised');
var rippleaccounttransactions = require('rippleaccounttransactions');
var rippleaccounttransactionstats = require('rippleaccounttransactionstats');
var rippleaccountoffers = require('rippleaccountoffers');
var RippledataActions = require("RippledataActions");



var AccountActions = {


	loadinggif: function(toresolves) {
			// Dispatcher.handleViewAction({
			// 	actionType: Constants.ActionTypes.LOADING_GIF,
			// 	toresolves:toresolves
			// });
	},
	
	rippleid: function(toresolve,gridsterKeys) {
		var self = this;
		// self.storeB();

		toresolves = toresolve;

		var rippleidcollection = new rippleids();

		rippleidcollection.createIdList(toresolves,gridsterKeys).then(function() {	
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEID,
				result: rippleidcollection
			});
			
			self.rippleoffersexercised(rippleidcollection);
			self.ripplecapitalization(rippleidcollection);
			self.rippleaccounttransactions(rippleidcollection);
			self.rippleaccounttransactionstats(rippleidcollection);
			self.rippleaccountoffers(rippleidcollection);
			self.ripplelines(rippleidcollection);
			self.rippleinfos(rippleidcollection);
		});
	},

	ripplelines: function(toresolve) {
		var self=this;
		var ripplelinescollection = new ripplelines();

		ripplelinescollection.createLinesList(toresolve.toJSON()).then(function() {	
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLELINES,
				result: ripplelinescollection
			});
			RippledataActions.exchangerates(ripplelinescollection.toJSON(),"month");
		});	

	},

	rippleinfos: function(toresolve) {
		var self = this;
		var rippleinfoscollection = new rippleinfos();
		// console.log("TORESOLVE_actionINFOS",toresolve);
		rippleinfoscollection.createInfosList(toresolve.toJSON()).then(function() {	

			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEINFOS,
				result: rippleinfoscollection
			});
		
		});	
	},


	ripplecapitalization: function(issuers) {
		var self = this;

		var collection= new ripplecapitalizations();
		collection.createIssuercapitalizationList(issuers.toJSON()).then(function() {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLECAPITALIZATION,
				result:collection
			});
			RippledataActions.exchangerates_capitalization(collection.toJSON(),"month");
		});

	},

	rippleoffersexercised: function(accounts,period) {
		var self = this;

		var collection = new rippleoffersexercised();
		collection.createOffersexercisedList(accounts.toJSON(),period).then(function() {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEOFFERSEXERCISED,
				result: collection
			});
		})
	},

	rippleaccounttransactions: function(accounts) {
		var self = this;

		var collection = new rippleaccounttransactions();
		collection.createAccountTransactionsList(accounts.toJSON()).then(function() {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEACCOUNTTRANSACTIONS,
				result: collection
			});
		})

	},

	rippleaccounttransactionstats: function(accounts) {
		var self = this;
		var collection = new rippleaccounttransactionstats();
		collection.createAccountTransactionStatsList(accounts.toJSON()).then(function() {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEACCOUNTTRANSACTIONSTATS,
				result: collection
			});
		});
	},

	rippleaccountoffers: function(accounts) {
		var self = this;
		var collection = new rippleaccountoffers();
		collection.createAccountOffersList(accounts.toJSON()).then(function() {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEACCOUNTOFFERS,
				result: collection
			});
		})

	}

}

module.exports = AccountActions;