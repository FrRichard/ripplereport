var User = require('../../models/UserSchema');

var moment = require('moment');
var securityUtils = require('../../utils/SecurityUtils');
var jwt = require('jwt-simple');
var jwtSecret = "chauvesourischauvenecrophile";

exports.register = function(req, res, next) {
	if (req.body && req.body.email && req.body.password) {
		console.log('blatte')
		var email = req.body.email;
		var password = req.body.password;
		User.getByAuthEmail(email, function(user, err) {
			if (user) {
				res.status(400).send('User already exists');
			} else {
				var newuser = {
					email: email,
					auth: {
						email: email,
						password: securityUtils.hashPassword(password)
					},
					created: new Date()
				};
				user = new User(newuser);
				user.save(function(err) {
					if (err) console.log('ERRROR SAVE USER', err);
					req.user = user;
					next();
				});
			}
		});
	}
};

exports.login = function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	User.getByAuthEmail(email, function(err, user) {
		if (err) {
			res.status(500).send('Internal server error');
		} else {
			if (!user) {
				res.status(404).send('Incorrect username');
			} else {
				var userpass = (user.toObject().auth && user.toObject().auth.password);
				if (!securityUtils.verifyPasswordHash(password, userpass)) {
					res.status(401).send('Incorrect password');
				} else {
					var expires = new moment().add(7, 'days').valueOf();
					var token = jwt.encode({
						iss: user.id,
						exp: expires
					}, jwtSecret);
					res.json({
						token: token,
						expires: expires,
						user: user.toJSON()
					});
				}
			}
		}
	});
};

exports.logout = function(req, res, next) {
};

exports.lostaccount = function(req, res, next) {
};

exports.getUser = function(req, res, next) {
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
	if (token) {
		console.log('token');
		var decoded;
		try {
			decoded = jwt.decode(token, jwtSecret);
		} catch (err) {
			console.log(err);
			return res.status(401).send('Auth required');
		}
		if (decoded.exp <= Date.now()) {
			res.status(400).send('Access token has expired');
		}
		User.getById(decoded.iss, function(err, user) {
			if (err) console.log(err);
			req.user = user;
			next();
		});
	} else {
		res.status(401).send('Auth required');
	}
};