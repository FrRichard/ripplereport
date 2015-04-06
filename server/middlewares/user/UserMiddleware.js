var User = require('../../models/UserSchema');

exports.get = function(req, res) {
	if (req.user) {
		res.send(req.user.toObject());
	} else {
		res.send('anonymous...');
	}
};