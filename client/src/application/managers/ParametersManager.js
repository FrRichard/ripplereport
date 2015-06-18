var config = require('parametersManagerConfig');


var ParametersManager = function ParametersManager() {

    if (ParametersManager.caller != ParametersManager.getInstance) {
            throw new Error("Cannot instantiate more than one ParametersManager, use ParametersManager.getInstance() ");
    }
    this.initInternalParams();
};

ParametersManager.prototype.init = function(callback) {
    var self = this;
    // this.items.fetch({
    //     type: 'POST',
    //     success: function() {
            self.initInternalParams();
            self.isInit = true;
    //         if (callback) {
    //             callback();
    //         }
    //     }
    // });
};



ParametersManager.prototype.initInternalParams = function() {


    this.currentParams = config.defaultparams;

};

ParametersManager.prototype.updateUserInputParams = function(params) {
    if (params && params.currency && params.platform && params.item) {
        this.currentParams = params;
    }
};

ParametersManager.prototype.getDefaultPairs = function(item) {
//  if (typeof config.defaultPairs[item] !== 'undefined') {
//             return config.defaultPairs[item];
//         } 
};

ParametersManager.prototype.computeUrl = function(params) {
    // return 'app?item=' + params.item + "&platform=" + params.platform + "&currency=" + params.currency;
};

ParametersManager.prototype.changeGlobalPair = function(pairId, platform) {
    // var params = {};
    // params.item = pairId.split("/")[0];
    // params.currency = pairId.split("/")[1];
    // params.platform = platform || this.currentParams.platform;
    // var url = this.computeUrl(params);
    // Backbone.history.navigate(url, true);
    // return false;
};

ParametersManager.prototype.changeGlobalPlatform = function(platformId, pairId) {
    // var params = config.defaultplatforms[platformId];
    // params.platform = platformId;
    // if (pairId) {
    //     params.item = pairId.split("/")[0];
    //     params.currency = pairId.split("/")[1];
    // }
    // var url = this.computeUrl(params);
    // Backbone.history.navigate(url, true);
    // return false;
};

ParametersManager.prototype.changeGlobalItem = function(itemid) {
    // var params = config.defaultitems[itemid];
    // params.item = itemid;
    // var url = this.computeUrl(params);
    // Backbone.history.navigate(url, true);
    // return false;
};
ParametersManager.prototype.getCurrentPlatformPairs = function() {
//     var platform = this.currentParams.platform;
//     return this.platforms.findByName(platform);
};

ParametersManager.prototype.getPlatformByPairId = function(pairId) {
    // var result;
    // _.each(this.platforms.models, function(model) {
    //     if (_.contains(model.pairs, pairId))  {
    //         result = model.id;
    //         return;
    //     }
    // });
    // return result;
};
/* Getters */
ParametersManager.prototype.getCurrentParams = function() {
    return this.currentParams;
};

ParametersManager.prototype.getPlatforms = function() {
    // return this.platforms;
};

ParametersManager.prototype.getItems = function() {
    // return this.items;
};

ParametersManager.prototype.getPairs = function() {
    // return this.pairs;
};

ParametersManager.prototype.getCurrencies = function() {
    // return this.currencies;
};


ParametersManager.instance = null;

ParametersManager.getInstance = function() {
        if (this.instance === null) {
            this.instance = new ParametersManager();
        }
        return this.instance;
};


module.exports = ParametersManager.getInstance();

