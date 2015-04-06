var request = require('request');

var APIManager = function() {
	if (APIManager.caller != APIManager.getInstance) {
		throw new Error("This object cannot be instanciated");
	}
};

APIManager.instance = null;

APIManager.getInstance = function() {
	if (this.instance === null) {
		this.instance = new APIManager();
	}
	return this.instance;
};

APIManager.prototype.init = function(config) {
	this.config = config;
};

APIManager.prototype.getPlatforms = function(callback) {
	var self = this;
	if (!this.platforms) {
		var platforms = [];
		request({
			method: 'POST',
			uri: this.config.platforms,
		}, function(error, response, body) {
			if (error) {
				console.log('ERROR API GET PLATFORMS : ', error);
			}
			try {
				self.platforms = JSON.parse(body);
			} catch (e) {
				console.log('CANNOT PARSE PARTFORMS JACKSON !!');
			}
			callback(self.platforms);
		});
	} else {
		callback(self.platforms);
	}
};

APIManager.prototype.getMethods = function() {
	var methods = [];
	return methods;
};

APIManager.prototype.getItems = function(callback) {
	var self = this;
	if (!this.items) {
		var items = [];
		request({
			method: 'POST',
			uri: this.config.items,
		}, function(error, response, body) {
			if (error) {
				console.log('ERROR API GET ITEMS : ', error);
			}
			try {
				self.items = JSON.parse(body);
			} catch (e) {
				console.log('CANNOT PARSE ITEMS JACKSON !!');
			}
			callback(self.items);
		});
	} else {
		callback(self.items);
	}
};

APIManager.prototype.getCriteria = function() {
	var criteria = [];
	return criteria;
};

module.exports = APIManager.getInstance();