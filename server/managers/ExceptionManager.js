var ExceptionManager = function () {
	
	// process.on('uncaughtException', function(exception) {
	// 	console.log('Uncaught exception : ', exception);
	// });
	if (ExceptionManager.caller != ExceptionManager.getInstance) {
		throw new Error("This object cannot be instanciated");
	}
};

// ExceptionManager.prototype.init = function(params){
// 	console.log('params', params);
// };

ExceptionManager.instance = null;

ExceptionManager.getInstance = function() {
	if (this.instance === null) {
		this.instance = new ExceptionManager();
		console.log('Exception manager...OK');
	}
	return this.instance;
};

module.exports = ExceptionManager.getInstance();