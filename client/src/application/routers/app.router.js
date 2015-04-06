var React = require("react");
var App = require('App');
var Account = require('Account');
var config = require('config');
var GridStore = require('GridStore');

var Router = Backbone.Router.extend({

    routes: {
        "app": "app",
        "report":"report"
    },

    initialize: function(params) {
   
	    Backbone.history.start({
            pushState: true
        });
    },

    app: function(params) {

        var dashboard_config = config.dashboards.account;

    	React.render(<App dashboard_config={ dashboard_config } />, document.getElementById('app'));
    },

    report: function(params) {

        var dashboard_config=GridStore.getConf('currentconf').conf;

        React.render(<Account dashboard_config={ dashboard_config} />, document.getElementById('app'));
    },

    render: function(callback) {

    },

    update: function(callback) {

    }

});


module.exports = Router;