var cronJob = require('cron').CronJob;
var request = require('request');

var urlCryptonews = "http://cryptonews.herokuapp.com/";

var CronJobs = {};

CronJobs.start = function() {

	var pingCryptonewsJob = new cronJob('*/2 * * * * *', function() {
		request(urlCryptonews, function(error, response, body) {
			if (error) console.log('Cron job, ping queuenb server error : ', error);
		})
	});
	pingCryptonewsJob.start();
	console.log('Cron job init... Success ' + urlCryptonews);

};

module.exports = CronJobs;