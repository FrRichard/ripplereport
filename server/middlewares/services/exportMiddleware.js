var wkhtmltox = require('../../libs/wkhtmltox/wkhtmltox');
var fs = require('fs');

exports.exportPdf = function(req, res, next) {
	var html = req.body.html;
	var type = req.body.type;
	var now = new Date();

	var filename = "hearbit-" + type + ".pdf";

	wkhtmltox.pdf(html, {
		output: filename
	}, function(code, signal) {
		console.log('pdf created!')
		res.send(200, filename);
	});
	
};

exports.getPdf = function(req, res, next) {
	var filename = req.params.filename;
	res.type('application/pdf');
	res.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"");
	res.sendfile(filename);
	// Delete file after
};

exports.exportPng = function(req, res, next) {
	var html = req.body.html;
	// wkhtmltox.image(html, {
	// 	output: 'graph.png'
	// });
	res.send(200);
	// }, function(code, signal) {
	// 	console.log('code ', code);
	// 	console.log('signal ', signal)
	// 	res.type('application/pdf');
	// 	res.setHeader("Content-Disposition", "attachment; filename=\"graph.pdf\"");
	// 	res.sendfile('graph.pdf')
	// 	// res.download('out.pdf', "heartbit.io - " + new Date().toString + ".pdf");
	// })
};