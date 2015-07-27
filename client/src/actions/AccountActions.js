var Constants = require('Constants');
var Dispatcher = require('Dispatcher');
var rippleids =  require('Ids');
var ripplelines = require('Lines');
var rippleinfos = require('Infos');
var ripplecapitalizations = require('Capitalizations');
var rippleoffersexercised =  require('Offersexercised');
var rippleaccounttransactions = require('AccountTransactions');
var rippleaccounttransactionstats = require('AccountTransactionStats');
var rippleaccountoffers = require('AccountOffers');
var RippledataActions = require("DataActions");
var ParametersManagerConfig  = require("ParametersManagerConfig");
var Uuid = require('Uuid');
//socket 
var LongPollingSocketManager = require('LongPollingSocketManager');



var AccountActions = {

	idtrack: function(toresolve) {
		var self = this;
		// console.log("=========================++++>ACTION_IDTRACK");
		var rippleidcollection = new rippleids();
		rippleidcollection.createIdList(toresolve).then(function() {	
			// console.log("==========+++>IDTRACK has fetched properly",rippleidcollection.toJSON());
			if(rippleidcollection.toJSON()[0].exists) {
				// console.log("==========+++>EMITING RIGHT from ACTIONS_IDTRACK");
				Dispatcher.handleViewAction({
					actionType: Constants.ActionTypes.ASK_RIPPLEID,
					result: rippleidcollection,
					init: "id"
				});
				Dispatcher.handleViewAction({
					actionType: Constants.ActionTypes.RIGHTADDRESS_ID,
					result: rippleidcollection
				});
				Dispatcher.handleServerAction({
					actionType:Constants.ActionTypes.ISLOADING
				});
				
			} else {
				Dispatcher.handleServerAction({
					actionType: Constants.ActionTypes.WRONGADDRESS_ID,
					result: rippleidcollection
				});
			}
		});
	},

	addresstrack: function(toresolve) {
		// console.log("addresstrazckactions",toresolve);
		var self = this;
		var rippleinfoscollection = new rippleinfos();
		// console.log("=========================++++>ACTION_ADDRESSTRACK");

		rippleinfoscollection.createInfosList(toresolve).then(function() {	
			console.log("================+++> ADDRESSTRACK has fetched properly",rippleinfoscollection.toJSON());
			var checkexistence = rippleinfoscollection.toJSON();
			if(checkexistence[0].error) {
				Dispatcher.handleViewAction({
						actionType: Constants.ActionTypes.WRONGADDRESS_INFOS,
						result: rippleinfoscollection
				});
			} else {
				// console.log("==========+++>EMITING RIGHT from ACTIONS_ADDRESSTRACK");
				Dispatcher.handleServerAction({
					actionType:Constants.ActionTypes.ISLOADING
				});
				Dispatcher.handleViewAction({
					actionType: Constants.ActionTypes.ASK_RIPPLEINFOS,
					result: rippleinfoscollection,
					init: "address"
				});
				Dispatcher.handleViewAction({
						actionType: Constants.ActionTypes.RIGHTADDRESS_INFOS,
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
		if(type == "address") {
			// console.log("ACTION_viewread with address type",address);
			self.rippleid( address.infos );
			self.rippleoffersexercised( address.infos );
			self.rippleoffersexercised_sum( address.infos, "sum" );
			self.ripplecapitalization( address.infos );
			self.accountTransactions( address.infos );
			self.rippleaccounttransactionstats( address.infos );
			self.rippleaccountoffers( address.infos );
			self.ripplelines( address.infos );
		} else {
			// console.log("ACTION_viewread with id type",address);
			self.rippleinfos( address.raw.toJSON() );
			self.rippleoffersexercised( address.raw.toJSON() );
			self.rippleoffersexercised_sum( address.raw.toJSON(), "sum" );
			self.ripplecapitalization( address.raw.toJSON() );
			self.accountTransactions( address.raw.toJSON() );
			self.rippleaccounttransactionstats( address.raw.toJSON() );
			self.rippleaccountoffers( address.raw.toJSON() );
			self.ripplelines( address.raw.toJSON() );
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

	accountTransactions: function(accounts,params) {
		var self = this;
		var i = 0;
		var params = params || ParametersManagerConfig.transactionparams;
		var explore = function(accounts, params) {
			params.uuid = Uuid();
			var dataroom = params.uuid;
			var collection = new rippleaccounttransactions();
			collection.createAccountTransactionsList(accounts,params).then(function(result) {
				// LongPollingSocketManager.emit('leave-dataroom', 'payment');
				Dispatcher.handleViewAction({
					actionType: Constants.ActionTypes.ASK_RIPPLEACCOUNTTRANSACTIONS,
					result: collection.toJSON()
				});
			});

			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ISLOADING_ACCOUNTTRANSACTIONS,
				result: collection.toJSON()
			});
			LongPollingSocketManager.once('connect', function (socket) {
				console.log("CONNECTED TO TRANSACTIONS SOCKET");
			});
			LongPollingSocketManager.once('enter-dataroom', function (payload) {
				console.log("enter-dataroom transaction socket",payload);
			});
			LongPollingSocketManager.once('leave-dataroom', function (payload) {
				console.log("leave-dataroom transaction socket",payload);
			});
			LongPollingSocketManager.on("stop", function(dataroom) {
				console.log("REQUEST HAS BEEN STOPPED!",dataroom);
			});

			// LongPollingSocketManager.emit("stop",dataroom);

			LongPollingSocketManager.emit('enter-dataroom', 'payment');
			LongPollingSocketManager.on(params.uuid, function (payload) {
				console.log("RECEIVING MSG FROM TX SOCKET",payload);
				Dispatcher.handleServerAction({
					actionType: Constants.ActionTypes.LOADINGSTATUS_ACCOUNTTRANSACTIONS,
					result: payload
				});
			});
		}

		explore(accounts, params);

	},

	accounttransactionstrack: function(accounts, reqParams, filterParams) {
		console.log("FILTERPARAMS",filterParams);
		var self=this;
		var GatewayNames = require('GatewayNames');
		this.addressList = [];
		this.paymentiteration = 0;
		var explore = function(accounts, reqParams, filterParams,depth) {
			var collection = new rippleaccounttransactions();
			reqParams['uuid'] = Uuid();
			LongPollingSocketManager.once('connect', function (socket) {
				console.log("CONNECTED TO TRANSACTIONS SOCKET");
			});
			LongPollingSocketManager.once('enter-dataroom', function (payload) {
				console.log("enter-dataroom transaction socket",payload);
			});
			LongPollingSocketManager.on(reqParams.uuid, function (payload) {
				console.log("RECEIVING MSG FROM TX SOCKET",payload);
			});
			if(depth >= 0) {
				var gaga = depth - 1 ;

				collection.createAccountTransactionsList(accounts,reqParams).then(function() {
					var payload = collection.toJSON();
					// console.log(filterParams.depth,payload);
					var id = payload[0].id;

					var register = function(payload) {
						Dispatcher.handleViewAction({
							actionType: Constants.ActionTypes.ASK_PAYMENTTRANSACTIONS,
							result: collection.toJSON()
						});
					};

					if(payload[0].summary && payload[0].summary.top10[filterParams.currency]) {
						var top10 = payload[0].summary.top10[filterParams.currency].sent;
						var exists = true;
					} else {
						var top10 = [];
						collection.models[0].attributes['msg'] = "This node didn't make any payment in " + filterParams.currency;					
						var exists = false;
					}
					console.log("BEFORE LOOP",filterParams.depth);
					// if(filterParams.depth >= 0) {
					// 	filterParams.depth--;
						var parent = accounts[0].address;
						var i = 0;
						var j = 0;
						while(i<filterParams.width && j<top10.length) {

							var address = top10[j].counterparty;
							var type = self.isGateway(address);
							var check = self.checkList(address); 

							if(check) {  
								j++;
							} else {
								self.addressList.push(address); 
								i++;
								j++;
								var account = {
									address: address,
									id: address,
									parent: parent,
									type:type
								}
								if(type != "gateway" && type != "hotwallet") {
									// filterParams.depth = 10;
								
									explore([account],reqParams,filterParams,gaga);
								} else {
									console.log("NOT EXPLORE car gateway",collection.toJSON(),account);
									account["account"] = account.address;
									console.log("dispatch gateway",filterParams.depth);
									// console.log("acccoooooooooooooooooooooounnnnt",[account])
									// Dispatcher.handleViewAction({
									// 	actionType: Constants.ActionTypes.ASK_PAYMENTTRANSACTIONS,
									// 	result: [account]
									// });
								}
							};
						}

						Dispatcher.handleViewAction({
							actionType: Constants.ActionTypes.ASK_PAYMENTTRANSACTIONS,
							result: collection.toJSON()
						});
						console.log("dispatch",filterParams.depth);
						// console.log(filterParams.depth, parent);
						
					// }

					
				});
			}
		};

		this.checkList = function(address) {
			var res = _.find(self.addressList, function(ad) {		
				return ad == address;
			});
			return res;
		}

		this.isGateway = function(address) {
			var type = _.filter(GatewayNames, function(gateway){
				return gateway.address == address;
			});
			if(type.length != 0) {
				return "gateway";
			} else {
				return "standard";
			}
		}

		this.isHotwallet = function(address) {

		}

		this.addressList.push(accounts[0].address);
		explore(accounts, reqParams, filterParams, filterParams.depth);
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