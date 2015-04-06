var express = require('express');

function StaticContentManager(params) {
	this.app = params.app;
	this.clientPath = params.clientPath;
};

StaticContentManager.prototype.init = function(callback) {
	this.app.use(express.static(this.clientPath + 'dist/', {
		maxAge: 0
	}));
	if (callback) {
		callback();
	}
};

module.exports = StaticContentManager;