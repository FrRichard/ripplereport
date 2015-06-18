var React = require("react");
var Config = require('config');
//View
var App = require('App');
var Transaction = require('Transaction');
var Price = require('Price');
var Features = require('Features');

//Store
var GridStore = require('GridStore');
var RippleidStore = require('RippleidStore');
var RippleinfosStore =require('RippleinfosStore');
//model 
var rippletrade = require('rippletrade');

//collections
var rippletrades = require('rippletrades');

//  managers
var RippleSocketManager = require('RippleSocketManager');
var ParametersManager = require('ParametersManager');

//actions
var DashboardActions = require('DashboardActions');
var AccountActions = require('AccountActions');
var RippledataActions = require('RippledataActions');
var RealtimeActions = require('RealtimeActions');
//helper
var gatewaysnames = require('gatewayNames');
var addressvalidator = require('addressvalidator');

var Router = Backbone.Router.extend({

    routes: {
        "app": "app",
        "transaction":"transaction",
        "price/*":"price",
        "features":"features"
    },

    initialize: function(params) {
        Backbone.history.start({
            pushState: true
        });
        this.datarooms = [];
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
        //parameter manager get current
        var self = this;
        if(ParametersManager.isInit) {
            ParametersManager.init();
        }

        if(params) {
            var params = {
                item: params.split('/')[0],
                currency: params.split('/')[1],
                platform: params.split('/')[2]
            }
            ParametersManager.updateUserInputParams(params);
        }

        var currentParams = ParametersManager.getCurrentParams();
        console.log("CURRENT FUCKING PARAMS", currentParams, params);
        var Model = new rippletrade(currentParams);
        RealtimeActions.registerDataroom();
        Model.socketSync();
        RealtimeActions.joinDataroom(currentParams);

        var up = function(params) {
                console.log("shiiiiiiiiiiiiiiiiiiiiiiit",params);
                var self = this;
                this.params = params;
                return function(payload) {
                    console.log(payload);
                    if(payload.isReversed) {
                        var params = {
                            item: self.params.currency,
                            currency: self.params.item,
                            platform: self.params.platform,
                            isReversed: true
                        };

                        ParametersManager.updateUserInputParams(params);
                        React.render(<Price />, document.getElementById('app'));
                    } else {
                        React.render(<Price />, document.getElementById('app'));
                    }
                }
        }(params);

        var updateGlobalParams = function(payload) {
            console.log("parazdazdazams",params);
            return up.call(this,payload,params);
        };

        
    
        RippleSocketManager.on('enter-dataroom', updateGlobalParams);

    },

    features: function(params) {
        console.log("FEATURES!");
        React.render(<Features/>, document.getElementById('app'));

    }


});


module.exports = Router;