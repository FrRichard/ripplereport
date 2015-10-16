var Constants = require('Constants');
var Dispatcher = require('Dispatcher');
var rippleids =  require('Ids');
var ripplelines = require('Lines');
var rippleinfos = require('Infos');
var ripplecapitalizations = require('Capitalizations');
var Capitalization = require('Capitalization');
// var rippleoffersexercised =  require('Offersexercised');
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
		var rippleidcollection = new rippleids();

		rippleidcollection.createIdList(toresolve).then(function() {	
			if(rippleidcollection.toJSON()[0].exists) {

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
		var self = this;
		var rippleinfoscollection = new rippleinfos();

		rippleinfoscollection.createInfosList(toresolve).then(function() {	
			var checkexistence = rippleinfoscollection.toJSON();
			if(checkexistence[0].error) {
				Dispatcher.handleViewAction({
						actionType: Constants.ActionTypes.WRONGADDRESS_INFOS,
						result: rippleinfoscollection
				});
			} else {
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
			self.rippleid( address.infos );
			// self.rippleoffersexercised( address.infos );
			// self.rippleoffersexercised_sum( address.infos, "sum" );
			self.ripplecapitalization( address.infos );
			self.accountTransactions( address.infos );
			self.rippleaccounttransactionstats( address.infos );
			self.rippleaccountoffers( address.infos );
			self.ripplelines( address.infos );
		} else {
			self.rippleinfos( address.raw.toJSON() );
			// self.rippleoffersexercised( address.raw.toJSON() );
			// self.rippleoffersexercised_sum( address.raw.toJSON(), "sum" );
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
		// var cap = new Capitalization();
		// // Capitalization.fetch("","rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q");
		// console.log(Capitalization);


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
		LongPollingSocketManager.once('connect', function (socket) {
		});

		LongPollingSocketManager.on("stop", function(dataroom) {
		});

		// LongPollingSocketManager.emit("stop",dataroom);

		LongPollingSocketManager.emit('enter-dataroom', 'payment');
		var explore = function(accounts, params) {

			params.uuid = Uuid();
			LongPollingSocketManager.on(params.uuid, function (payload) {
				Dispatcher.handleServerAction({
					actionType: Constants.ActionTypes.LOADINGSTATUS_ACCOUNTTRANSACTIONS,
					result: payload
				});
			});
			//console.log("ACTION TRANSACTIONS",params,accounts);
			var dataroom = params.uuid;
			var collection = new rippleaccounttransactions();
			collection.createAccountTransactionsList(accounts,params).then(function(result) {
				Dispatcher.handleViewAction({
					actionType: Constants.ActionTypes.ASK_RIPPLEACCOUNTTRANSACTIONS,
					result: collection.toJSON()
				});
			});

			Dispatcher.handleViewAction({
				actionType: Constants.ActionTypes.ISLOADING_ACCOUNTTRANSACTIONS,
				result: collection.toJSON()
			});
		}

		explore(accounts, params);

	},

	accounttransactionstrack: function(accounts, reqParams, filterParams) {
		var self=this;
		this.recur = true;

		Dispatcher.handleViewAction({
			actionType: Constants.ActionTypes.ADDRESSCHANGE_PYMNTSTORE,
			result: accounts
		});

		var GatewayNames = require('GatewayNames');
		// LongPollingSocketManager._callbacks = {};
		var endedNodes = [];
		this.addressList = [];
		LongPollingSocketManager.once('leave-dataroom', function (payload) {
			// console.log("leave-dataroom transaction socket",payload);
		});
		this.isdispatched = false;
		this.fetched = [];
		this.max = 300;
		var allNodes = [];
		var uuid = Uuid();

		LongPollingSocketManager.on(uuid, function(payload) {
			if(payload.msg == 'stop') {
				self.recur = false;
			}
		});

		LongPollingSocketManager.on(uuid, function (payload) {
				// console.log(payload);
			 	function allNodeFetched(endedNodes)  {
					for(var node in endedNodes) {
						if(!endedNodes[node]) return false;
					}
					return true;
				}
				// endedNodes.push(payload);
					// console.log("Are all nodes fetched ????",endedNodes, allNodeFetched(endedNodes),allNodes);
				if(payload.msg == "Fetched") {
					endedNodes[payload.address] = true;
					// console.log("FETCHED AND ???",payload);	
					Dispatcher.handleViewAction({
						actionType: Constants.ActionTypes.ASK_PYMNTLASTFETCH,
						result: payload						
					});
					// console.log("LENGTH!",endedNodes.length,allNodes.length);
					// if(allNodeFetched(endedNodes) && allNodes.length != 0) {
					// 	console.log("DISPATCH!",allNodes,endedNodes);
					// 	Dispatcher.handleViewAction({
					// 		actionType: Constants.ActionTypes.ASK_PAYMENTTRANSACTIONS,
					// 		result: allNodes						
					// 	});
					// }
				}
		});
		// console.log(LongPollingSocketManager);
		var explore = function(accounts, reqParams, filterParams,depth) {
			var collection = new rippleaccounttransactions();
			reqParams['uuid'] = uuid;
			
			if(depth >= 0 && self.max >=0) {
				var currentDepth = depth - 1 ;

				collection.createAccountTransactionsList(accounts,reqParams).then(function() {

					function registerNode(arg) {
						allNodes.push(collection.toJSON()[0]);
						endedNodes[accounts[0].address] = true;
						// console.log(allNodes);
			
					}
					registerNode();
					Dispatcher.handleViewAction({
						actionType: Constants.ActionTypes.ISLOADING_PYMNTSTORE,
						result: collection.toJSON()
					});
					var payload = collection.toJSON();
					// console.log("COLLECTION PAYLOAD !!!!", payload);
					var gtw = false;
					var gatewayList = [];
					var id = payload[0].id;

					if(payload[0].summary && payload[0].summary.top10[filterParams.currency]) {
						var top10 = payload[0].summary.top10[filterParams.currency].sent;
						var exists = true;
					} else {
						var top10 = [];
						collection.models[0].attributes['msg'] = "This node didn't make any payment in " + filterParams.currency;					
						var exists = false;
					}

					var parent = accounts[0].address;
					var i = 0;
					var j = 0;
					while(i<filterParams.width && j<top10.length && self.max > 0) {

						var address = top10[j].counterparty;
						var type = self.isGateway(address);
						var check = self.checkList(address); 

						if(check) {  
							j++;
						} else {
							if(depth-1 >= 0) {
								self.addressList.push(address); 
								endedNodes[address] = false;
							}
							i++;
							j++;
							var account = {
								address: address,
								id: address,
								parent: parent,
								type:type
							}
						
							if(type != "gateway" && type != "hotwallet" && self.recur) {
								console.log(self.max);
								explore([account],reqParams,filterParams,currentDepth);								
								self.max -= 1;					
							} else {
								self.max -= 1;	
								gtw = true;
								account["account"] = account.address;
								endedNodes[account.address] = true;
								allNodes.push(account);
								gatewayList.push(account);
							}
						};
					}
					
				}).then(function() {
					// check if every request came back
					endedNodes[accounts[0].address] = true;
					// console.log("everything is fetched",allNodeFetched(endedNodes), allNodes.length, endedNodes, allNodes);
					if(self.isdispatched == false) {
						function allNodeFetched(endedNodes)  {
							for(var node in endedNodes) {
								if(!endedNodes[node]) return false;
							}
							return true;
						}
						if(allNodeFetched(endedNodes) && allNodes.length != 0) {
							Dispatcher.handleViewAction({
								actionType: Constants.ActionTypes.ASK_PAYMENTTRANSACTIONS,
								result: allNodes						
							});
							self.isdispatched = true;
						}
					}
				
				});
			} else {
			
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
		endedNodes[accounts[0].address] = true;
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