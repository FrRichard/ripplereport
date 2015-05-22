var EventsController = _.extend({}, Backbone.Events);
var GridStore = require('GridStore');
var React = require('react');
// var Account = require('Account');


EventsController.on("report", function(payload) {
	// console.log(Account);
	  // var dashboard_config=GridStore.getConf('currentconf').conf;
	  // console.log(dashboard_config);
	  // console.log(Account);
	  // React.render(<Account dashboard_config={ dashboard_config} />, document.getElementById('app'));
   // React.render(<div> uuuuuud </div>, document.getElementById('app'));
});

module.exports = EventsController;