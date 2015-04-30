var React = require("react");
var App = require('App');
var Account = require('Account');
var config = require('config');
var GridStore = require('GridStore');
var DashboardActions = require('DashboardActions');
var AccountActions = require('AccountActions');
var gatewaysnames = require('gatewayNames');
var Config = require('config');

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
            toresolve = [param.address];
            var conf = config.dashboards.account;
            conf['reportnumber']= toresolve.length;
            DashboardActions.registerconf(conf);
            _.each(gatewaysnames, function(gateway) {
                if(toresolve == gateway.address || toresolve == gateway.name) {
                    conf = Config.dashboards.gateway;
                    DashboardActions.registerconf(conf);
                }
            });
            AccountActions.rippleid(toresolve); 
            Backbone.history.navigate('report',{trigger: true, replace: true});
        } else {
            React.render(<App/>, document.getElementById('app'));
        }
    },

    report: function(params) {    
        React.render(<Account  />, document.getElementById('app'));
    },

    render: function(callback) {

    },

    update: function(callback) {
        var dashboard_config=GridStore.getConf('currentconf').conf;

        React.render(<Account dashboard_config={ dashboard_config} />, document.getElementById('app'));

    }

});


module.exports = Router;