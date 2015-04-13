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

module.exports = config;