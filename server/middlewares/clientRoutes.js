var fs = require('fs');
var _ = require('underscore');

// Configure basic auth
var auth = require('http-auth');
var basic = auth.basic({
	realm: 'We are currently in alpha but we need beta testers, please contact us to receive an invitation!'
}, function(username, password, callback) {
	callback(username == 'test' && password == 'f00lpr00f');
});
var authMiddleware = auth.connect(basic);

function ClientRoutes() {};

ClientRoutes.prototype.init = function(params, callback) {
	var self = this;

	this.clientPath = params.clientPath;
	this.filename = params.filename;
	this.serverPath = params.serverPath;
	this.app = params.app;

	fs.readFile(this.filename, 'utf8', function(err, data) {

		if (err) {
			return console.log(err);
		}

		// Unprotected routes
		var unprotectedRoutes = JSON.parse(data).unprotectedRoutes;
		console.log('Unprotected routes:');
		_.each(unprotectedRoutes, function(file, route) {
			if (file.indexOf(':') > -1) {
				var filename = file.replace('file:', '');
				console.log('\t' + route + ' -> ' + filename);
				self.app.all(route, function(req, res) {
					res.render(self.clientPath + filename)
					// res.sendfile(self.clientPath + filename);
				});
			}
		});

		// Protected routes
		var protectedRoutes = JSON.parse(data).protectedRoutes;
		console.log('Protected routes:');
		_.each(protectedRoutes, function(file, route) {
			if (file.indexOf(':') > -1) {
				var filename = file.replace('file:', '');
				console.log('\t' + route + ' -> ' + filename);
				self.app.all(route, authMiddleware, function(req, res) {

					res.render(self.clientPath + filename)
					// res.sendfile(self.clientPath + filename);
				});
			}
		});

		if (callback) {
			callback();
		}

	});

};

module.exports = ClientRoutes;