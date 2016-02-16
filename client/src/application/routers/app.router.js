var React = require("react");
var Config = require('Config');
var ParametersManagerConfig = require('ParametersManagerConfig');
//View
var App = require('App');
var TransactionView = require('TransactionView');
var Price = require('Price');
var Features = require('Features');
var PaymentTrackingMain = require('PaymentTrackingMain');
// var PaymentTracking = require('PaymentTracking');
var AccountView = require('Account');
var SearchbarAccount = require('SearchbarAccount');
var SearchbarTracking = require('PaymentTrackingSearchView');

//Store
var GridStore = require('GridStore');
var RippleidStore = require('IdStore');
var RippleinfosStore =require('InfosStore');
//model 
var rippletrade = require('Trade');

//collections
var rippletrades = require('Trades');

//  managers
var RippleSocketManager = require('RippleSocketManager');
var ParametersManager = require('ParametersManager');

//actions
var DashboardActions = require('DashboardActions');
var AccountActions = require('AccountActions');
var RippledataActions = require('DataActions');
var RealtimeActions = require('RealtimeActions');
//helper
var gatewaysnames = require('GatewayNames');
var addressvalidator = require('AddressValidator');

var Router = Backbone.Router.extend({

    routes: {
        'app(/:params)': 'app',
        'transaction(/:params)': 'transaction',
        'price/*': 'price',
        // "features":"features",
        'paymenttracking': 'paymenttracking'       
    },

    initialize: function(params) {
        Backbone.history.start({
            pushState: true,
            // root:'/'
        });
        this.datarooms = [];
    },


    app: function(address) {
        React.render(<App searchBar = {SearchbarAccount} title = "Ledger Monitor"/>, document.getElementById('app'));
        if(address) {
            var toresolve = [address];
            var conf = Config.dashboards.account;
            DashboardActions.registerconf(conf);
            DashboardActions.settype('balance'); //default tab type
            _.each(gatewaysnames, function(gateway) {
                if(address == gateway.address || address == gateway.name) {
                    conf = Config.dashboards.gateway;
                    DashboardActions.registerconf(conf);
                }
            });
            conf['reportnumber']= toresolve.length;
            var address = "address" + toresolve.length;

            if(addressvalidator.decode(toresolve[0])) {
                this.type = "address";
                AccountActions.addresstrack(toresolve);
            } else if(toresolve[0][0] == "~") {
                this.type = "id"
                AccountActions.idtrack(toresolve);
            }

        } 
    },

    transaction: function(params) {
        if(params) {
            RippledataActions.transaction([params]);
        } 
        React.render(<TransactionView />, document.getElementById('app'));
    },

    price: function(params) {
    
        var self = this;
        if(ParametersManager.isInit) {
            ParametersManager.init();
        }
        var oldParams = ParametersManager.getCurrentParams();
        RealtimeActions.leaveDataroom(oldParams);
        if(params) {
            var params = {
                item: params.split('/')[0],
                currency: params.split('/')[1],
                platform: params.split('/')[2]
            }
            ParametersManager.updateUserInputParams(params);
        }

        var currentParams = ParametersManager.getCurrentParams();
        RealtimeActions.registerDataroom(); //set listener

        if(!this.Model) {
            this.Model = new rippletrade(currentParams);
        }
        if(params) {
            this.Model.socketSync(params);
        } else {
            this.Model.socketSync();
        }

        var up = function(params) {
                return function(payload) {
                        ParametersManager.updateUserInputParams(params);
                        React.render(<Price />, document.getElementById('app'));
                }
        }(params);

        var updateGlobalParams = function(payload) {
            return up.call(this,payload,params);
        };
        RippleSocketManager.once('enter-dataroom', updateGlobalParams);
        RealtimeActions.joinDataroom(currentParams);

    },

    features: function(params) {
        React.render(<Features/>, document.getElementById('app'));

    }, 

    paymenttracking: function(params) {
        var params = ParametersManagerConfig.transactiontrackingparams;
        var conf = Config.dashboards.paymenttracking;
        DashboardActions.registerconf(conf);
        React.render(<PaymentTrackingMain searchBar={SearchbarTracking} title="Payment Tracking"/>, document.getElementById('app'));
    }


});



module.exports = Router;