var config = require('../config');
var Remote = require('ripple-lib').Remote;
var EventManager = require('../managers/EventManager');
var url = require('url');
var redis = require('redis');
var _ = require('underscore');


var Price = function() {
	if (Price.caller != Price.getInstance) {
        throw new Error("This object cannot be instanciated");
    }
};

Price.prototype.init = function(params) {
	var self = this;
	if(this.instance != null) {
		console.log("Price already initialized");
		return;
	}

    var redisOptions = {
        return_buffers: false,
    };
	var redisCloudUrl = url.parse(params.url);
    this.redisClient = redis.createClient(redisCloudUrl.port, redisCloudUrl.hostname, redisOptions);
    this.redisClient.auth('Vnq9p2FR5eRkL26T',function(uh) {
        console.log(uh,"REDIS AUTH .... OK");
    });


	console.log("Ripple_websocket INIT .... OK");
	var remote = new Remote({
		servers: [ config.rippleaccountproxy.remoteserver ]
	});
 
	remote.connect(function() { 
		console.log("Ripple_WS Connected to " + config.rippleaccountproxy.remoteserver);
	});

	remote.on("disconnect", function() {
		remote.connect(function() {
			console.log("Remote (ripple_price) has been connected again due to disconnection");
		});
	});

	_.each(config.gateways, function(params, gateway) {
		_.each(params.currencies, function(currency) {
			var parameters ={};
			parameters[gateway] = 
			{
					ask: {
						currency_gets: currency,
						issuer_gets: params.address,
						currency_pays: 'XRP',
						issuer_pays: null
					},

					bid: {
						currency_gets: 'XRP',
						issuer_gets: null,
						currency_pays:currency,
						issuer_pays: params.address
					}
			};

			var mybook_bid = remote.book(parameters[gateway].bid);
			var mybook_ask = remote.book(parameters[gateway].ask);
			var bidParams = {
				currency: currency,
				gateway: gateway,
				item: 'XRP',
				type: 'BID'
			};

			var askParams = {
				currency: currency,
				gateway: gateway,
				item: 'XRP',
				type: 'ASK'
			}


		    mybook_bid.on("trade", Price.instance.bid_handler(bidParams));
		    mybook_ask.on("trade", Price.instance.ask_handler(askParams));  

		});
	});

}

Price.prototype.ask_handler = function(params) {
	var self = this;
	var sep = ":";
    return function ask(tg, tp) {

  		if(tg.is_valid() || tp.is_valid()) {
			console.log("ASK");
	  //       console.log("Taker_gets",tg.to_human());
	        // console.log("Taker_gets ==> to_number",tg.to_number());
	  //       console.log("Taker_pays",tp.to_human());
	        // console.log("Taker_pays ==> to_number",tp.to_number());
	        var volumeitem = tg.to_number();
	        var volumecurrency = tp.to_number();
	        var price = tp.ratio_human(tg).to_human();
	        channel = params.gateway + sep + params.item + sep + params.currency + sep + params.type;

	        (params.item == 'XRP') ? volumeitem = volumeitem/Math.pow(10,6) : volumeitem = volumeitem;

	        var payload = {
	        	price: price,
	        	volumeitem:volumeitem,
	        	volumecurrency:volumecurrency,
	        	item: params.item,
	        	currency: params.currency,
	        	type: params.type,
	        	platform: params.gateway
	        }

	       	console.log("From Websocket", payload, channel);
	       	payload = JSON.stringify(payload);
	        self.redisClient.publish(channel, payload);
	    }
    }
	
}

Price.prototype.bid_handler = function(params) {
	var self = this;
	var sep = ":";
    return function bid(tg, tp){

		if(tg.is_valid() || tp.is_valid()) {
			console.log("BID");
	  //       console.log("Taker_gets",tg.to_human());
	        console.log("Taker_gets ==> to_number",tg.to_number());
	  //       console.log("Taker_pays",tp.to_human());
	        console.log("Taker_pays ==> to_number",tp.to_number());
	        var volumeitem = tp.to_number();
	        var volumecurrency = tg.to_number();
	        var price = tg.ratio_human(tp).to_human();
	        channel = params.gateway + sep + params.item + sep + params.currency + sep + params.type;

	        (params.item == 'XRP') ? volumeitem = volumeitem/Math.pow(10,6) : volumeitem = volumeitem;

	        var payload = {
	        	price: price,
	        	volumeitem:volumeitem,
	        	volumecurrency:volumecurrency,
	        	item: params.item,
	        	currency: params.currency,
	        	type: params.type,
	        	platform: params.gateway
	        }
	        console.log("From Websocket", payload, channel);
	        payload = JSON.stringify(payload);
	        self.redisClient.publish(channel, payload);
	    }
    }
}


Price.instance = null;

Price.getInstance = function() {
	if(this.instance === null) {
		this.instance = new Price();
	} 
	return this.instance;
};


module.exports = Price.getInstance();