var React = require("react");
var App = require('App');
var Account = require('Account');
var config = require('config');
var GridStore = require('GridStore');
var DashboardActions = require('DashboardActions');
var AccountActions = require('AccountActions');

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
        if(params) {
            var param = JSON.parse(params);
            console.log("paraaaAPPPPPAPAPAPAP",param.address);
            var conf = config.dashboards.account;
            toresolve= [param.address];
            conf['reportnumber']= toresolve.length;
            DashboardActions.registerconf(conf);
            Backbone.history.navigate('report',{trigger: true, replace: true});
            AccountActions.rippleid(toresolve); 
        } else {
            var dashboard_config = config.dashboards.account;

        	React.render(<App dashboard_config={ dashboard_config } />, document.getElementById('app'));
        }
    },

    report: function(params) {
        console.log("aaaaaaaagaggaga");
        var dashboard_config=GridStore.getConf('currentconf').conf;

        React.render(<Account dashboard_config={ dashboard_config} />, document.getElementById('app'));
    },

    render: function(callback) {

    },

    update: function(callback) {
        var dashboard_config=GridStore.getConf('currentconf').conf;

        React.render(<Account dashboard_config={ dashboard_config} />, document.getElementById('app'));

    }

});


module.exports = Router;