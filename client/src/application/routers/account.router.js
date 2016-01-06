var React = require("react");
var Account = require('Account');
var config = require('Config');

var Router = Backbone.Router.extend({

    routes: {
        "account": "account"
    },

    initialize: function(params) {
   
	    Backbone.history.start({
            pushState: true
        });
    },

    account: function(params) {

        var dashboard_config = config.dashboards.account;

    	React.render(<Account dashboard_config={ dashboard_config } />, document.getElementById('app'));
    },

    render: function(callback) {

    },

    update: function(callback) {

    }

});


module.exports = Router;


