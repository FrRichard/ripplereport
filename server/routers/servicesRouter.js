var express = require('express');
var servicesRouter = express();

var ExportMiddleware = require('../middlewares/services/exportMiddleware');
servicesRouter.post('/pdf', ExportMiddleware.exportPdf);
servicesRouter.get('/pdf/:filename', ExportMiddleware.getPdf);
servicesRouter.post('/png', ExportMiddleware.exportPng);

var MailgunMiddleware = require('../middlewares/services/mailgunMiddleware');
servicesRouter.post('/feedback', MailgunMiddleware.sendUserFeedback);

module.exports = servicesRouter;