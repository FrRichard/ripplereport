

var parametersManagerConfig = {};

parametersManagerConfig.defaultparams = {
	platform: 'BITSTAMP',
	item: 'XRP',
	currency: 'USD'
};

parametersManagerConfig.transactionparams =  {
            limit:1000,
            offset:1000,
            type:"Payment",
            min_sequence:1
};


parametersManagerConfig.rippleDefaultplatforms = {
	BITSTAMP: {
		item: 'XRP',
		currency: 'USD'
	},

	BITSTAMP: {
		item: 'XRP',
		currency: 'BTC'
	},

	SNAPSWAP: {
		item: 'XRP',
		currency: 'USD'
	},

	SNAPSWAP: {
		item: 'XRP',
		currency: 'BTC'
	}
};



module.exports = parametersManagerConfig;