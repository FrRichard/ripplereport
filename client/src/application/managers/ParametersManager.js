var config = require('ParametersManagerConfig');


var ParametersManager = function ParametersManager() {

    if (ParametersManager.caller != ParametersManager.getInstance) {
            throw new Error("Cannot instantiate more than one ParametersManager, use ParametersManager.getInstance() ");
    }
    this.initInternalParams();
};

ParametersManager.prototype.init = function(callback) {
    var self = this;
    self.initInternalParams();
    self.isInit = true;
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
};

ParametersManager.prototype.computeUrl = function(params) {
    var sep = '/';
    return 'price?'+ params.item + sep + params.currency + sep +  params.platform;
};

ParametersManager.prototype.changeGlobalPair = function(channel) {
    var params = {};
    params.item = channel.split("/")[0];
    params.currency = channel.split("/")[1];
    params.platform = channel.split("/")[2];
    var url = this.computeUrl(params);
    Backbone.history.navigate(url, true);
};

ParametersManager.prototype.changeGlobalPlatform = function(platformId, pairId) {
    
};

ParametersManager.prototype.changeGlobalItem = function(itemid) {
  
};
ParametersManager.prototype.getCurrentPlatformPairs = function() {

};

ParametersManager.prototype.getPlatformByPairId = function(pairId) {
  
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

