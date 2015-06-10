var React = require("react");
var Config = require('config');
//View
var App = require('App');
var Transaction = require('Transaction');
var Price = require('Price');

//Store
var GridStore = require('GridStore');
var RippleidStore = require('RippleidStore');
var RippleinfosStore =require('RippleinfosStore');

//model test
var RippleTrade = require('ripple_trade');

//actions
var DashboardActions = require('DashboardActions');
var AccountActions = require('AccountActions');
var RippledataActions = require('RippledataActions');
//helper
var gatewaysnames = require('gatewayNames');
var addressvalidator = require('addressvalidator');

var Router = Backbone.Router.extend({

    routes: {
        "app": "app",
        "transaction":"transaction",
        "price":"price"
    },

    initialize: function(params) {
        Backbone.history.start({
            pushState: true
        });
    },

    app: function(params) {
        React.render(<App/>, document.getElementById('app'));
        if(params) {
            var param = JSON.parse(params);
            var toresolve = [param.address];
            var conf = Config.dashboards.account;
            DashboardActions.registerconf(conf);
            _.each(gatewaysnames, function(gateway) {
                if(param.address == gateway.address || param.address == gateway.name) {
                    conf = Config.dashboards.gateway;
                    DashboardActions.registerconf(conf);
                }
            });
            conf['reportnumber']= toresolve.length;
            var address = "address" + toresolve.length;

            if(addressvalidator.decode(toresolve[0])) {
                console.log("=========================++++>VIEW detects Address");
                this.type = "address";
                AccountActions.addresstrack(toresolve);
            } else if(toresolve[0][0] == "~") {
                console.log("==========================++++>VIEW detects ~name");
                this.type = "id"
                AccountActions.idtrack(toresolve);
            }

        } 
    },

    transaction: function(params) {
        if(params) {
            var params = JSON.parse(params);
            RippledataActions.transaction([params]);
        } 
        React.render(<Transaction />, document.getElementById('app'));
    },

    price: function(params) {

        React.render(<Price />, document.getElementById('app'));

    }


});


module.exports = Router;