var _ = require('underscore');
var redis = require('redis');
var url = require('url');
var Q = require('q');

function CacheManager() {
    if (CacheManager.caller != CacheManager.getInstance) {
        throw new Error("This object cannot be instanciated");
    }
};

CacheManager.prototype.init = function(params) {
    var deferred = Q.defer();
    var self = this;

    var redisOptions = {
        return_buffers: false,
    };

    if (params.isDeployed) {
        // this.redisClient = redis.createClient(null, null, redisOptions);
        var redisCloudUrl = url.parse(params.url);
        this.redisClient = redis.createClient(redisCloudUrl.port, redisCloudUrl.hostname, redisOptions);
        this.redisClient.auth(redisCloudUrl.auth.split(":")[1]);
    } else {
        var redisCloudUrl = url.parse(params.url);
        this.redisClient = redis.createClient(redisCloudUrl.port, redisCloudUrl.hostname, redisOptions);
        this.redisClient.auth(redisCloudUrl.auth.split(":")[1]);
    }

    this.redisClient.on("error", function(err) {
        console.log('Cache client error :' + err);
    });

    this.redisClient.on("connect", function() {
        console.log('Cache connection...OK');
        deferred.resolve();
    });

    return deferred.promise;
};

CacheManager.prototype.get = function(key, callback) {
    console.log('redis get : ', key)
    this.redisClient.get(key, function(err, buffer) {
        console.log('redis response')
        if (err) {
            console.log('Error client redis', err);
            callback(err);
        } else {
            try {
                var deserializedDoc = JSON.parse(buffer);
                callback(deserializedDoc);
            } catch (ex) {
                console.log('Cannot parse buffer' + buffer);
                callback(buffer);
            }
        }
    });
};

CacheManager.prototype.set = function(key, element) {
    var isObject = _.isObject(element) || _.isArray(element);
    var buffer;
    try {
        buffer = (isObject) ? JSON.stringify(element) : element;
        this.redisClient.set(key, buffer);
    } catch (e) {
        console.log('Cache manager set : ', e);
    }
};

CacheManager.prototype.del = function(keys, callback) {
    this.redisClient.del(keys, function(err, buffer) {
        if (err) {
            if (callback) {
                callback(err);
            }
        } else {
            if (callback) {
                callback(buffer);
            }
        }
    });
};

CacheManager.instance = null;

CacheManager.getInstance = function() {
    if (this.instance === null) {
        this.instance = new CacheManager();
    }
    return this.instance;
};

module.exports = CacheManager.getInstance();