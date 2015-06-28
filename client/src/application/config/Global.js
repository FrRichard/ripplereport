var dashboards = require('ConfigDashboards');
var rippleaccount = require('ConfigRippleAccount');
var rippledataapi = require('ConfigRippleDataApi');
var historicalapi = require('ConfigHistoricalApi');

var apiprefix = "/api/";

var config = {};

config.dashboards = dashboards;
config.rippleaccount = rippleaccount;
config.rippledataapi = rippledataapi;
config.historicalapi = historicalapi;

config.platform = {};
config.platform.url = apiprefix + "documentation/platform";
config.platform.urlCollection = apiprefix + "documentation/platform";

config.item = {};
config.item.url = apiprefix + "documentation/item";
config.item.urlCollection = apiprefix + "documentation/item";

config.ticker = {};
config.ticker.url = apiprefix + "ticker/";

config.marketcap = {};
config.marketcap.urlModel = apiprefix + "marketcap/all";
config.marketcap.urlCollection = apiprefix + "marketcap/all";

config.calculator = {};
config.calculator.urlModel = "data/calculator.json";
config.calculator.urlCollection = "data/calculator.json";

config.networkdata = {};
config.networkdata.urlModel = apiprefix + "networkdata";
config.networkdata.urlCollection = apiprefix + "networkdata";

config.maingraph = {};
config.maingraph.urlCollection = apiprefix + "maingraph";
config.maingraph.defaultTimeperiodId = "last24hours";
config.maingraph.timeperiods = [{
	id: 'last3hours',
	label: '3H',
	duration: '3',
	typeDuration: 'HOUR'
}, {
	id: 'last6hours',
	label: '6H',
	duration: '6',
	typeDuration: 'HOUR'
}, {
	id: 'last12hours',
	label: '12H',
	duration: '12',
	typeDuration: 'HOUR'
}, {
	id: 'last24hours',
	label: '24h',
	duration: '1',
	typeDuration: 'DAY'
}, {
	id: 'last3days',
	label: '3d',
	duration: '3',
	typeDuration: 'DAY'
}, {
	id: 'last7days',
	label: '7d',
	duration: '7',
	typeDuration: 'DAY'
}, {
	id: 'last1month',
	label: '1m',
	duration: '1',
	typeDuration: 'MONTH'
}, {
	id: 'last3months',
	label: '3m',
	duration: '3',
	typeDuration: 'MONTH'
}, {
	id: 'last6months',
	label: '6m',
	duration: '6',
	typeDuration: 'MONTH'
}, {
	id: 'last1year',
	label: '1Y',
	duration: '1',
	typeDuration: 'YEAR'
}, {
	id: 'all',
	label: 'all',
	duration: '1',
	typeDuration: 'ALL'
}];

config.keyfactsview = {};
config.keyfactsview.defaultAttributes = [{
	id: 'price',
	label: 'Last',
	type: 'price'
}, {
	id: 'wavg',
	label: 'Avg',
	type: 'price'
}, {
	id: 'high',
	label: 'High',
	type: 'price'
}, {
	id: 'low',
	label: 'Low',
	type: 'price'
}, {
	id: 'daily',
	label: 'Daily',
	type: 'percent'
}, {
	id: 'vol',
	label: '24h vol.',
	// type: 'volume'
	type: 'volume-short'
}];

var newsprefix = "/news/";

config.tweet = {};
config.tweet.urlCollection = newsprefix + "tweets";

config.news = {};
config.news.urlCollection = newsprefix + "news";

config.fbpost = {};
config.fbpost.urlCollection = newsprefix + "fbposts";



module.exports = config;