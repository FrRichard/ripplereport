var redis = require('redis');
var url = require('url');
var _ = require('underscore');
var Q = require('q');
var fs = require('fs');
var EventManager = require('./EventManager');
var apiManager = require('./APIManager');
var CacheManager = require('./CacheManager_ripple');
var config = require('../config/');

function RedisManager() {
    if (RedisManager.caller != RedisManager.getInstance) {
        throw new Error("This object cannot be instanciated");
    }
};

RedisManager.prototype.init = function(params) {
    var deferred = Q.defer();
    // var self = this;

    var redisOptions = {
        return_buffers: false,
    };


    if(params.isDeployed) {
        var redisCloudUrl = url.parse(params.url);
        this.redisClient = redis.createClient(redisCloudUrl.port, redisCloudUrl.hostname, redisOptions);
        this.redisClient.auth('Vnq9p2FR5eRkL26T',function(uh) {
            console.log(uh,"REDIS AUTH .... OK");
        });
        
    } else {
        var redisCloudUrl = url.parse(params.url);
        this.redisClient = redis.createClient(redisCloudUrl.port, redisCloudUrl.hostname, redisOptions);
        this.redisClient.auth('Vnq9p2FR5eRkL26T',function(uh) {
            console.log(uh,"REDIS AUTH .... OK");
        });

    }

    this.redisClient.on("error", function(err) {
        console.log('Pub/sub client error :' + err);
    });

    this.redisClient.on("connect", function() {
        console.log('Pub/sub connection...OK');
        deferred.resolve();
    });
    
    return deferred.promise;
};


RedisManager.prototype.subscribeToChannels = function(callback) {
    console.log("Redis_ripple Channel Subscription ... OK");
    var self = this;
    var sep = ":";
    _.each(config.gateways, function(params, gateway) {
        _.each(params.currencies, function(currency) {
            _.each(config.measures.ripple, function(type) {
                var channel = gateway + sep + params.item + sep + currency + sep +type.key;
                self.redisClient.subscribe(channel);
            });
        });
    });
    self.redisClient.on("message", function(channel, message) {
        console.log(channel,message);
        CacheManager.set(channel, message);
        EventManager.emit(channel, message);
    });

    if (callback) {
        callback();
    }
};

// RedisManager.prototype.parseMessage = function(channel, message) {
//     var jsonMessage;
//     try {
//         jsonMessage = JSON.parse(message);
//     } catch (e) {
//         console.log('Problem parsing message', e);
//     }
//     return jsonMessage;
// };

// RedisManager.prototype.getClient = function() {
//     return this.redisClient;
// };

RedisManager.instance = null;

RedisManager.getInstance = function(params) {
    if (this.instance === null) {
        this.instance = new RedisManager();
    }
    return this.instance;
};

module.exports = RedisManager.getInstance();