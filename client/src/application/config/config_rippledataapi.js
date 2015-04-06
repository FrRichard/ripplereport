var moment = require('moment');
var Config = {
	exchange_rates: {
		urlModel: "/ripple/dataapi/exchange_rates/?pairs="
	},
	issuer_capitalization: {
		urlModel: "/ripple/dataapi/issuer_capitalization/?issuer="
	},
	account_offers_exercised: {
		urlModel: "/ripple/dataapi/account_offers_exercised/?account="
	},
	account_transactions: {
		urlModel: "/ripple/dataapi/account_transactions/?account="
	},
	account_transaction_stats: {
		urlModel: "/ripple/dataapi/account_transaction_stats/?account="
	},
	market_traders: {
		urlModel: "/ripple/dataapi/market_traders/?params="
	},
	default_period: {
		startTime: moment().subtract(1, 'months').format(),
		endTime: moment().format()
	}
};


module.exports = Config;