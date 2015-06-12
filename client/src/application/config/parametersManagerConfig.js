

var parametersManagerConfig = {};

parametersManagerConfig.defaultparams = {
	platform: 'BITSTAMP',
	item: 'XRP',
	currency: 'USD'
};
parametersManagerConfig.defaultTickerRoom = {
	BTC : ['BTC:USD','BTC:CNY','BTC:EUR'],
	LTC : ['LTC:USD','LTC:CNY','LTC:EUR','LTC:BTC']
};
parametersManagerConfig.defaultPairs = {
	BTC : {
	  USD:['BITSTAMP','BITFINEX','BTCE'],
	  CNY:['BTCCHINA','OKCOIN'],
	  EUR:['KRAKEN']
	},
	LTC : {
	  USD:['BITFINEX','BTCE'],
	  CNY:['BTCCHINA','OKCOIN'],
	  EUR:['KRAKEN'],
	  BTC:['CRYPTSY']
	}
};
parametersManagerConfig.defaultplatforms = {
	BTCE: {
		item: 'BTC',
		currency: 'USD'
	},
	KRAKEN: {
		item: 'BTC',
		currency: 'EUR'
	},
	BITSTAMP: {
		item: 'BTC',
		currency: 'USD'
	},
	BTCCHINA: {
		item: 'BTC',
		currency: 'CNY'
	},
	OKCOIN: {
		item: 'BTC',
		currency: 'CNY'
	},
	CRYPTSY: {
		item: 'DOGE',
		currency: 'BTC'
	},
	BITFINEX: {
		item: 'BTC',
		currency: 'USD'
	}
};

parametersManagerConfig.defaultitems = {
	BC: {
		platform: "CRYPTSY",
		currency: "BTC"
	},
	NXT: {
		platform: "CRYPTSY",
		currency: "BTC"
	},
	BC: {
		platform: "CRYPTSY",
		currency: "BTC"
	},
	BTC: {
		platform: "BITSTAMP",
		currency: "USD"
	},
	LTC: {
		platform: "BTCE",
		currency: "USD"
	},
	DOGE: {
		platform: "KRAKEN",
		currency: "BTC"
	},
	NMC : {
		platform: "BTCE",
		currency: "USD"
	},
	NVC: {
		platform: "BTCE",
		currency: "USD"
	},
	TRC: {
		platform: "BTCE",
		currency: "BTC"
	},
	PPC: {
		platform: "BTCE",
		currency: "USD"
	},
	FTC: {
		platform: "BTCE",
		currency: "BTC"
	},
	XPM: {
		platform: "BTCE",
		currency: "BTC"
	},
	XRP: {
		platform: "KRAKEN",
		currency: "USD"
	}
};

module.exports = parametersManagerConfig;