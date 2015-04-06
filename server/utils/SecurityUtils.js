var passwordHasher = require('password-hash');

var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

exports.generateToken = function(length) {
	length = length ? length : 32;
	var token = '';
	for (var i = 0; i < length; i++) {
		var randomNumber = Math.floor(Math.random() * chars.length);
		token += chars.substring(randomNumber, randomNumber + 1);
	}
	return token;
};

exports.hashPassword = function(password) {
	return passwordHasher.generate(password);
};

exports.verifyPasswordHash = function(password, hash) {
	return passwordHasher.verify(password, hash);
};

exports.isAdminUser = function(user) {
	if (user.email.indexOf('schonfeld.david@gmail.com') != -1) return true;
	return false;
};