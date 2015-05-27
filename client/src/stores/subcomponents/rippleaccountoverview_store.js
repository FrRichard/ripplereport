var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');
var RippleidStore = require('RippleidStore');
var RipplelinesStore = require('RipplelinesStore');
var RippleinfosStore = require('RippleinfosStore');
var RippleexchangeratesStore = require('RippleexchangeratesStore');

var CHANGE_EVENT = 'change';
var _RippleAccountOverviews = {};
var datasets = {};
var shares;
var defaultCurrency;
var gatewayNames = require('gatewayNames');

function registerAccountOverviews(result) {
	_RippleAccountOverviews = result;
	console.log('_RippleAccountOverviews',_RippleAccountOverviews);
}

function createStoreObject(datasets) {
	var result = {};
	_.each(datasets, function(dataset) {
		result[dataset.id] = {};
 		result[dataset.id]['shares'] = calculateShares(dataset.id, dataset);
 		result[dataset.id]['currencylist'] = getCurrencyList(result[dataset.id]['shares']);
 		result[dataset.id]['totalfiat'] = {};
 		_.each(result[dataset.id]['currencylist'], function(currency) {
 			result[dataset.id]['totalfiat'][currency.currency] = calculateFiatTotal(result[dataset.id]['shares'], currency.currency, currency.issuer);
 		});
 		result[dataset.id]['datasets'] = datasets;
	})


 	return result;
}

function initDatasets(ids) {
	
	var ids = ids;
	_.each(ids, function(id) {
		datasets[id.id] = {
			ripplelines : {},
			rippleinfos : {},
    		rippleexchangerates : {},
    		id: id.id
		};
	});
	defaultCurrency='XRP';
}

function registerRippleLines(lines) {
	var lines = lines;
	_.each(lines, function(line) {
		datasets[line.id]['ripplelines'] = line;
	});
}

function registerRippleInfos(infos) {
	var infos = infos;
	_.each(infos, function(info) {
		datasets[info.id]['rippleinfos'] = info;
	});
}

function registerRippleExchangerates(rates) {
	var rates = rates;
	_.each(rates, function(rate) {
		datasets[rate.id]['rippleexchangerates']= rate;
	});
}


function calculateShares(toresolve,dataset) {
  var data = [];
  _.map(dataset.ripplelines.lines,function(line) {
    if( line.balance > 0 ) {
      var balance = { balance:parseFloat(line.balance), currency:line.currency, xrpequ:"" , issuer:line.account };
      // Chercher l'équivalent de la currency en XRP pour pie chart proportionnelle à la valeur de chaque actif
       _.each(dataset.rippleexchangerates, function(account) {
        if(_.isObject(account)) {
          if( line.currency == account.base.currency && line.account == account.base.issuer ) {
            var xrpequivalent = line.balance*account.last;          
            balance.xrpequ = xrpequivalent; 
          }
        };
      });        
      data.push(balance);
    } 
  });

  //Add XRP
  var xrpbalance ={ 
    balance:parseFloat((dataset.rippleinfos.account_data.Balance)*Math.pow(10,-6)), 
    currency:"XRP",
    xrpequ:parseFloat((dataset.rippleinfos.account_data.Balance)*Math.pow(10,-6))
  };

  data.push(xrpbalance);

  data.sort(function(a,b) {
    if (a.currency < b.currency) 
      return -1;
    if(a.currency > b.currency)
      return 1;
    return 0
  });

  return data;
}

function getCurrencyList(shares) {

  var list = _.map(shares, function(share) {
    var name = _.filter(gatewayNames,function(gateway) {
        return gateway.address == share.issuer;
    });

    if (share.currency == 'XRP') {
      el = { currency:share.currency, issuer:undefined, name:undefined };
   	} else if (name.length == 0) { 
      el = { currency:share.currency, issuer:share.issuer, name:"Not an official gateway" };
	} else {
      el = { currency:share.currency, issuer:share.issuer, name:name[0].name };
    }
    return el;
  });

  return list;
}

function calculateFiatTotal(shares,fiat,issuer) {
  var result = {};
  result.totalfiat = 0;
  var rate; 
  // Cas si uniquement des XRP comme balance
  if (fiat== "XRP" ) {
    var xrpshare = _.filter(shares, function(share) {
      return share.currency == "XRP";
    });

    result.totalfiat = xrpshare[0].balance;
    result.issuer = "";

    _.each(shares, function(share) {
    	if(share.currency != 'XRP') {
    		result.totalfiat += share.xrpequ;
    	}
    });

    return result ;
  }


  _.each(shares,function(share) {
    if(share.currency==fiat && share.issuer==issuer) {
      rate = share.xrpequ/share.balance;
      result.issuer = share.issuer;  
    }
  });
  _.each(shares, function(share) {
    result.totalfiat += share.xrpequ/rate;
  });

  return result;
}


var RippleaccountoverviewsStore = assign( {}, EventEmitter.prototype, {
	getAll: function() {
		return _RippleAccountOverviews;
		// return datasets;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleAccountOverviews[key];
		return res;
	},

	emitChange: function(result) {
		var self=this;
		var addresses = result.toJSON();
		_.each(addresses, function(address) {
			self.emit(address.id);
		});
	},

	emitLoading: function(event) {
		this.emit(event);
	},

	addChangeListener: function(address,callback) {
		this.on(address, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}


});

var allStoreReady = function(stores,action) {
	var isReady = _.every(stores, function(store) {
		return (store == true);
	});
	if(isReady) {
		var tosave = createStoreObject(datasets);
		registerAccountOverviews(tosave);
		RippleaccountoverviewsStore.emitChange(action.result);
	}
}

var isReady = {};

RippleaccountoverviewsStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
	var result;

	if(action.init) {
		if(action.init == "address") {
			isReady = {	id: false, lines:false, exchangerates:false, infos:false};
			initDatasets(RippleinfosStore.getAll());
		} else {
			isReady = {	id: false, lines:false, exchangerates:false, infos:false };
			initDatasets(RippleidStore.getAll());
		}
	}
	switch(action.actionType) {
		// case Constants.ActionTypes.ASK_RIPPLEACCOUNTOVERVIEW:
		case Constants.ActionTypes.ASK_RIPPLEID:
			Dispatcher.waitFor([
				RippleidStore.dispatcherIndex
			])
			isReady.id = true;
			allStoreReady(isReady,action);
			break;

		case Constants.ActionTypes.ASK_RIPPLEINFOS:
			Dispatcher.waitFor([
				RippleinfosStore.dispatcherIndex
			])
			registerRippleInfos(RippleinfosStore.getAll());
			isReady.infos = true;
			allStoreReady(isReady,action);
			break;

		case Constants.ActionTypes.ASK_RIPPLELINES:
			Dispatcher.waitFor([
				RipplelinesStore.dispatcherIndex
			])
			registerRippleLines(RipplelinesStore.getAll());
			isReady.lines = true;
			allStoreReady(isReady,action);
			break;

		case Constants.ActionTypes.ASK_RIPPLEEXCHANGERATES:
			Dispatcher.waitFor([
				RippleexchangeratesStore.dispatcherIndex
			]);
			registerRippleExchangerates(RippleexchangeratesStore.getAll());
			isReady.exchangerates = true
			allStoreReady(isReady,action);
			break;

		case Constants.ActionTypes.ISLOADING:
			RippleaccountoverviewsStore.emitLoading('isloading');
			break;
	}

	return true;
});

module.exports = RippleaccountoverviewsStore;
