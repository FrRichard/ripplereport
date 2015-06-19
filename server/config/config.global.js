var config = {};

config.apiproxy = {};
config.apiproxy.host = "http://176.31.126.113";
config.apiproxy.port = "8080";
config.apiproxy.hostUrl = config.apiproxy.host + ":" + config.apiproxy.port;
config.apiproxy.apiUrl = config.apiproxy.hostUrl + '/api/';

config.apiproxy.platforms = config.apiproxy.apiUrl + 'documentation/platform';
config.apiproxy.items = config.apiproxy.apiUrl + 'documentation/item';
config.apiproxy.criteria = config.apiproxy.apiUrl + 'documentation/criteria';
config.apiproxy.methods = config.apiproxy.apiUrl + 'documentation/methods';

config.newsproxy = {};
// config.newsproxy.host = "http://localhost";
// config.newsproxy.port = "9091";
config.newsproxy.host = "http://cryptonews.herokuapp.com";
config.newsproxy.port = "80";
config.newsproxy.hostUrl = config.newsproxy.host + ":" + config.newsproxy.port;
config.newsproxy.apiUrl = config.newsproxy.hostUrl + '/news/';


config.rippleaccountproxy = {};
config.rippleaccountproxy.host = "https://id.ripple.com/v1/user/";
config.rippleaccountproxy.port = "";
config.rippleaccountproxy.hostUrl = config.rippleaccountproxy.host;
config.rippleaccountproxy.remoteserver = "wss://s1.ripple.com:443";


config.rippledataapiproxy = {};
config.rippledataapiproxy.host = "http://api.ripplecharts.com/api/";
config.rippledataapiproxy.port = "";
config.rippledataapiproxy.methodsUrls = {
	exchange_rates: config.rippledataapiproxy.host +"exchange_rates",
	issuer_capitalization: config.rippledataapiproxy.host + "issuer_capitalization",
	account_offers_exercised: config.rippledataapiproxy.host + "account_offers_exercised",
	account_transactions: config.rippledataapiproxy.host + "account_transactions",
	account_transaction_stats: config.rippledataapiproxy.host + "account_transaction_stats",
	market_traders: config.rippledataapiproxy.host + "market_traders",
}

config.historicalapiproxy = {};
config.historicalapiproxy.host = "https://history.ripple.com/v1/";
config.historicalapiproxy.port = "";
config.historicalapiproxy.hostUrl = config.historicalapiproxy.host;

config.db = {};
// config.db.redis = "redis://ber:fraisefrqise95@insightfult.iocointrader.com:6379";
config.db.redis = "redis://ber:fraisefrqise95@heartbit.io:6379";

config.measures = [{
	key: 'TCK',
	name: 'ticker'
}, {
	key: 'TRD',
	name: 'trade'
}, {
	key: 'DEPTH',
	name: 'depth'
}];

config.clientproxy = {};
config.clientproxy.urlRoutes = 'config/client-proxy-routes.json';

/////////////////////////////////////////////////CONFIG REDIS_LOCAL//////////////////////////////////////////////////////:
config.db.redis_local = "redis://127.0.0.1:6379";
// config.db.redis_local = "redis://pub-redis-14766.us-east-1-4.3.ec2.garantiadata.com:14766";

config.measures.ripple = [{
	key: 'ASK'
},
{
	key:'BID'
}];

config.gateways = {
	BITSTAMP: {
		address: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',
		currencies: ['USD','BTC'],
		item :'XRP'
	},
	SNAPSWAP: {
		address: 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q',
		currencies: ['USD','BTC','EUR'],
		item :'XRP'
	},
	TOKYOJPY: {
		address: 'r94s8px6kSw1uZ1MV98dhSRTvc6VMPoPcN',
		currencies: ['JPY'],
		item :'XRP'
	},
	RIPPLECHINA: {
		address: 'razqQKzJRdB4UxFPWf5NEpEG3WMkmwgcXA',
		currencies: ['CNY'],
		item :'XRP'
	},
	RIPPLESINGAPORE: {
		address: 'r9Dr5xwkeLegBeXq6ujinjSBLQzQ1zQGjH',
		currencies: ['SGD'],
		item :'XRP'
	},
	BITSO: {
		address: 'rG6FZ31hDHN1K5Dkbma3PSB5uVCuVVRzfn',
		currencies: ['MXN'],
		item :'XRP'
	},
	RIPPEX: {
		address: 'rfNZPxoZ5Uaamdp339U9dCLWz2T73nZJZH',
		currencies: ['BRL'],
		item :'XRP'
	}
}

config.ripplePairDefault = {
	USD: "BITSAMP",
	EUR: "SNAPSWAP",
	JPY: "TOKYOJPY",
	CNY: "RIPPLECHINA",
	SGD: "RIPPLESINGAPORE",
	MXN: "BITSO",
	BRL:"RIPPEX"
}


module.exports = config;