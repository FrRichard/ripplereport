var Dispatcher = require("Dispatcher");
var EventEmitter = require('events').EventEmitter;
var Constants = require('Constants');
var assign = require('object-assign');
var RippleexchangeratescapitalizationStore = require('RippleexchangeratescapitalizationStore');
var RipplecapitalizationStore = require('RipplecapitalizationStore')
var RippleidStore = require("RippleidStore");

var CHANGE_EVENT = 'change';
var _RippleCapitalizationOverviews = {};
var datasets = {};
var shares;
var defaultCurrency;
var gatewayNames = require('gatewayNames');

function registerCapitalizationOverviews(result) {
	_RippleCapitalizationOverviews = result;
	console.log('_RippleCapitalizationOverviews',_RippleCapitalizationOverviews);
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
    		rippleexchangerates : {},
    		id: id.id
		};
	});
	defaultCurrency='XRP';
}

function registerRippleExchangerates(rates) {
	var rates = rates;
	_.each(rates, function(rate) {
		datasets[rate.id]['rippleexchangerates']= rate;
	});
}


function registerRippleCapitalization(caps) {
	var caps = caps;
	_.each(caps, function(cap) {
		datasets[cap.id]['ripplecapitalizations'] = cap;
	});
}

function calculateShares(toresolve,dataset) {
  var data = [];
	_.map(dataset.ripplecapitalizations,function(cap) {
		if( cap.amount > 0 ) {
		  var balance = { balance:parseFloat(cap.amount), currency:cap.currency, xrpequ:"" , issuer:cap.issuer };
		  // Chercher l'équivalent de la currency en XRP pour pie chart proportionnelle à la valeur de chaque actif
		_.each(dataset.rippleexchangerates, function(account) {
			if(_.isObject(account)) {
				if( cap.currency == account.base.currency && cap.issuer == account.base.issuer ) {
					var xrpequivalent = cap.amount*account.last;          
					balance.xrpequ = xrpequivalent; 
				}
			};
		});        
		  data.push(balance);
		} 
	});

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


var RipplecapitalizationoverviewStore = assign( {}, EventEmitter.prototype, {
	getAll: function() {
		return _RippleCapitalizationOverviews;
		// return datasets;
	},

	getSpecific:function(key) {
		var res = {};
		res[key]= _RippleCapitalizationOverviews[key];
		return res;
	},

	emitChange: function(result) {
		var self=this;
		var addresses = result.toJSON();
		_.each(addresses, function(address) {
			self.emit(address.id);
		});
	},

	addChangeListener: function(address,callback) {
		this.on(address, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}


});


RipplecapitalizationoverviewStore.dispatcherIndex = Dispatcher.register(function(payload) {
	var action = payload.action;
	var result;
	
	switch(action.actionType) {
		// case Constants.ActionTypes.ASK_RIPPLEACCOUNTOVERVIEW:
		case Constants.ActionTypes.ASK_RIPPLEEXCHANGERATES_CAPITALIZATION:
			Dispatcher.waitFor([
				RippleexchangeratescapitalizationStore.dispatcherIndex,
				RipplecapitalizationStore.dispatcherIndex
			]);
			initDatasets(RippleidStore.getAll());
			registerRippleExchangerates(RippleexchangeratescapitalizationStore.getAll());
			registerRippleCapitalization(RipplecapitalizationStore.getAll());
			var tosave = createStoreObject(datasets);
			registerCapitalizationOverviews(tosave);
			RipplecapitalizationoverviewStore.emitChange(action.result);
			
			break;
	}

	return true;
});

module.exports = RipplecapitalizationoverviewStore;
