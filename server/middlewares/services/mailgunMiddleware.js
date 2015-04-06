var Mailgun = require('mailgun').Mailgun;
var mg = new Mailgun('key-2mw0o22z329mavqj6270sumog-y667k3');

var sendEmail = function(sender, recipients, subject, text, cb) {
	mg.sendText(sender, recipients, subject, text, function(err) {
		if (err) console.log('Oh noes: ' + err);
		else console.log('Success');
		if (cb) {
			cb(err);
		}
	});
};

exports.sendUserFeedback = function(req, res, next) {
	var email = req.body.email;
	var msg = req.body.msg;

	console.log('email', email);
	console.log('msg', msg);

	sendEmail(email, [
			"schonfeld.david@gmail.com",
			"support@heartbit.io",
			"bertrand.richard8@gmail.com",
			"francois.richard12@gmail.com"
		],
		"[HOME FORMULAIRE]",
		msg,
		function(error) {
			error ? res.send(500) : res.send(200);
		});

};