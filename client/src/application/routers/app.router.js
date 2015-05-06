var React = require("react");
var App = require('App');
var Account = require('Account');
var config = require('config');
var GridStore = require('GridStore');
var RippleidStore = require('RippleidStore');
var RippleinfosStore =require('RippleinfosStore');
var DashboardActions = require('DashboardActions');
var AccountActions = require('AccountActions');
var gatewaysnames = require('gatewayNames');
var Config = require('config');
var addressexists = require('AddressExists');

var Router = Backbone.Router.extend({

    routes: {
        "app": "app",
        "report":"report",
        "update/:params":"update"
    },

    initialize: function(params) {
        	    Backbone.history.start({
            pushState: true
        });
    },

    app: function(params) {
     
        if(params) {

            this.AddressExists = new addressexists;

            var param = JSON.parse(params);
            var toresolve = [param.address];
            var conf = config.dashboards.account;
            DashboardActions.registerconf(conf);
            _.each(gatewaysnames, function(gateway) {
                if(param.address == gateway.address || param.address == gateway.name) {
                    conf = Config.dashboards.gateway;
                    DashboardActions.registerconf(conf);
                }
            });
            conf['reportnumber']= toresolve.length;
            var address = "address" + toresolve.length;

            var params = {
                conf: conf,
                address: address,
                toresolve: toresolve
            }
            var exists = this.AddressExists.check(params);

        } else {
            React.render(<App/>, document.getElementById('app'));
        }
    },

    report: function(params) {    
 
    },

    render: function(callback) {

    },

    update: function(params) {
        Backbone.history.navigate('report',{trigger: true});

        var params = JSON.parse(params);
        var conf = params.conf;
        var address = params.address;
        var type = params.type;

        React.render(<Account/>, document.getElementById('app'));

        if(type == "address") {
            console.log("ISSTOREREADYINFOS",RippleinfosStore.getSpecific("address1")[address]);
            var idcollection = RippleinfosStore.getSpecific("address1")[address];
        }  else {
             console.log("ISSTOREREADYIDS",RippleidStore.getSpecific("address1")[address]);
            var idcollection = RippleidStore.getSpecific("address1")[address];
        }
        AccountActions.viewready(idcollection,type);
        DashboardActions.registerconf(conf);
    }

});


module.exports = Router;