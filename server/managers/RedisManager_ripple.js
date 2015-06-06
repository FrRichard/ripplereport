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
        this.redisClient.set("test", "mes couilles", redis.print);
        this.redisClient.on("event!",function(pattern,channel,message) {
            console.log(pattern,channel,message);
        });

        this.redisClient.on("error", function(err) {
            console.log('Pub/sub client error :' + err);
        });

        this.redisClient.on("connect", function() {
            console.log('Pub/sub connection...OK');
            deferred.resolve();
        });
        
    } else {

    }

    
    return deferred.promise;
};

    // if (params.isDeployed) {
    //     // this.redisClient = redis.createClient();
    //     var redisCloudUrl = url.parse(params.url);
    //     this.redisClient = redis.createClient(redisCloudUrl.port, redisCloudUrl.hostname, redisOptions);
    //     this.redisClient.auth(redisCloudUrl.auth.split(":")[1]);
    // } else {
    //     var redisCloudUrl = url.parse(params.url);
    //     this.redisClient = redis.createClient(redisCloudUrl.port, redisCloudUrl.hostname, redisOptions);
    //     this.redisClient.auth(redisCloudUrl.auth.split(":")[1]);
    // }

    // this.redisClient.on("error", function(err) {
    //     console.log('Pub/sub client error :' + err);
    // });

    // this.redisClient.on("connect", function() {
    //     console.log('Pub/sub connection...OK');
    //     deferred.resolve();
    // });
// RedisManager.prototype.subscribeToChannels = function(callback) {
//     var self = this;
//     var sep = ":";

//     apiManager.getPlatforms(function(platforms) {
//         _.each(platforms, function(platform) {
//             _.each(platform.pairs, function(pair) {
//                 _.each(config.measures, function(measure) {
//                     var channel = platform.name + sep + pair.item + sep + pair.currency + sep + measure.key;
//                     self.redisClient.psubscribe(channel);
//                 });
//             });
//         });

//         self.redisClient.on("pmessage", function(pattern, channel, message) {
//             message = self.parseMessage(channel, message);
//             // console.log(channel);

//             // if (channel.indexOf('TCK') != -1) {
//             //     console.log(channel); // + "    " + message.order_book.length);
//             //     console.log(message);
//             // }

//             CacheManager.set(channel, message);
//             EventManager.emit(channel, message);
//         });

//         if (callback) {
//             callback();
//         }
//     });
// };

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

RedisManager.getInstance = function() {
    if (this.instance === null) {
        this.instance = new RedisManager();
    }
    return this.instance;
};

module.exports = RedisManager.getInstance();