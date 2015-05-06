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

	idtrack: function(toresolve) {
		var self = this;
		Dispatcher.handleServerAction({
			actionType:Constants.ActionTypes.ISLOADING
		});
		var rippleidcollection = new rippleids();
		rippleidcollection.createIdList(toresolve).then(function() {	
			console.log("IDCOLLECTION",rippleidcollection.toJSON());
			if(rippleidcollection.toJSON()[0].exists) {
				Dispatcher.handleViewAction({
					actionType: Constants.ActionTypes.ASK_RIPPLEID,
					result: rippleidcollection,
					init: "id"
				});
				Dispatcher.handleViewAction({
					actionType: Constants.ActionTypes.RIGHTADDRESS,
					result: rippleidcollection
				});
				
			} else {
				Dispatcher.handleServerAction({
					actionType: Constants.ActionTypes.WRONGADDRESS,
					result: rippleidcollection
				});
			}
		});
	},

	addresstrack: function(toresolve) {
		console.log("addresstrazckactions",toresolve);
		var self = this;
		var rippleinfoscollection = new rippleinfos();

		Dispatcher.handleServerAction({
			actionType:Constants.ActionTypes.ISLOADING
		});

		rippleinfoscollection.createInfosList(toresolve).then(function() {	
			console.log("rippleinfocollection",rippleinfoscollection.toJSON());
			var checkexistence = rippleinfoscollection.toJSON();
			if(checkexistence[0].error) {
				Dispatcher.handleViewAction({
						actionType: Constants.ActionTypes.WRONGADDRESS,
						result: rippleinfoscollection
				});
			} else {
				Dispatcher.handleViewAction({
					actionType: Constants.ActionTypes.ASK_RIPPLEINFOS,
					result: rippleinfoscollection,
					init: "address"
				});
				Dispatcher.handleViewAction({
						actionType: Constants.ActionTypes.RIGHTADDRESS,
						result: rippleinfoscollection
				});
			}
		
		});	
	},

	rippleinfos: function(toresolve) {
		var self = this;
		var rippleinfoscollection = new rippleinfos();
		rippleinfoscollection.createInfosList(toresolve).then(function() {	
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEINFOS,
				result: rippleinfoscollection
			});	
		});
	},

	rippleid: function(toresolve) {
		var self = this;

		var rippleidcollection = new rippleids();
		rippleidcollection.createIdList(toresolve).then(function() {	
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEID,
				result: rippleidcollection
			});
		});

	},

	viewready: function(address,type) {
		var self = this;
		console.log("ADDRESS",address);
		if(type == "address") {
			self.rippleid( address.infos );
			self.rippleoffersexercised( address.infos );
			self.rippleoffersexercised_sum( address.infos, "sum" );
			self.ripplecapitalization( address.infos );
			self.rippleaccounttransactions( address.infos );
			self.rippleaccounttransactionstats( address.infos );
			self.rippleaccountoffers( address.infos );
			self.ripplelines( address.infos );
		} else {
			self.rippleoffersexercised( address.raw.toJSON() );
			self.rippleoffersexercised_sum( address.raw.toJSON(), "sum" );
			self.ripplecapitalization( address.raw.toJSON() );
			self.rippleaccounttransactions( address.raw.toJSON() );
			self.rippleaccounttransactionstats( address.raw.toJSON() );
			self.rippleaccountoffers( address.raw.toJSON() );
			self.ripplelines( address.raw.toJSON() );
			self.rippleinfos( address.raw.toJSON() );
		}
	},

	ripplelines: function(toresolve) {
		var self=this;


		var ripplelinescollection = new ripplelines();

		ripplelinescollection.createLinesList(toresolve).then(function() {	
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLELINES,
				result: ripplelinescollection
			});
			RippledataActions.exchangerates(ripplelinescollection.toJSON(),"month");
		});	

	},



	ripplecapitalization: function(issuers) {
		var self = this;

		var collection= new ripplecapitalizations();
		collection.createIssuercapitalizationList(issuers).then(function() {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLECAPITALIZATION,
				result:collection
			});
			RippledataActions.exchangerates_capitalization(collection.toJSON(),"month");
		});

	},

	rippleoffersexercised: function(accounts, period) {
		var self = this;
		var collection = new rippleoffersexercised();
		collection.createOffersexercisedList(accounts, period).then(function() {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEOFFERSEXERCISED,
				result: collection
			});
		})
	},

	rippleoffersexercised_sum: function(account, period) {
		var self = this;
		var collection = new rippleoffersexercised();
		collection.createOffersexercisedList(account, period).then(function() {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEOFFERSEXERCISED_SUM,
				result: collection
			});
		});


	},

	rippleaccounttransactions: function(accounts) {
		var self = this;

		var collection = new rippleaccounttransactions();
		collection.createAccountTransactionsList(accounts).then(function() {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEACCOUNTTRANSACTIONS,
				result: collection
			});
		})

	},

	rippleaccounttransactionstats: function(accounts) {
		var self = this;
		var collection = new rippleaccounttransactionstats();
		collection.createAccountTransactionStatsList(accounts).then(function() {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEACCOUNTTRANSACTIONSTATS,
				result: collection
			});
		});
	},

	rippleaccountoffers: function(accounts) {
		var self = this;
		var collection = new rippleaccountoffers();
		collection.createAccountOffersList(accounts).then(function() {
			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ASK_RIPPLEACCOUNTOFFERS,
				result: collection
			});
		})

	}

}

module.exports = AccountActions;