var React = require('react');
var Config = require('config');
var AccountActions = require('AccountActions');
var DashboardActions = require('DashboardActions');
var RippledataActions = require('RippledataActions');
var RippleidStore = require('RippleidStore');
var approuter = require('AppRouter');
var GridStore = require('GridStore');
var gatewaysnames = require('gatewayNames');
var EventsController = require('EventsController');
var AccountoverviewStore = require('RippleaccountoverviewsStore');
var addressvalidator = require('addressvalidator');
var addressexists = require('AddressExists');
/** @jsx React.DOM */


function getRippleidState(key) {

    var rippleid=RippleidStore.getSpecific(key);
    return {
      id:new Date().getTime(),
      rippleids:rippleid
    }
}


var SearchBar = React.createClass({

	getInitialState: function() {
		return null;
	},


	componentDidMount: function() {
		// console.log(this.address);
		RippleidStore.addChangeListener("wrongaddress" ,this._onWrongId);
		RippleidStore.addChangeListener("rightaddress" ,this._onRightId);
	},

	handleClick: function() {
		var self = this;
		var input = $('#search input').val();
		this.toresolve = input.split(",");
		
		this.address = "address" + this.toresolve.length;

		this.conf = Config.dashboards.account;

		_.each(gatewaysnames, function(gateway) {
			if(self.toresolve[0] == gateway.address || self.toresolve[0] == gateway.name) {
				self.conf = Config.dashboards.gateway;
				//DashboardActions.registerconf(this.conf);
			}
		});

		this.conf['reportnumber']= this.toresolve.length;

			console.log("SEARCHTORESOLVE",this.toresolve[0],this.toresolve[0].length,addressvalidator.decode(this.toresolve[0]));
		

		if(addressvalidator.decode(this.toresolve[0])) {
			console.log("ADDRESSTRACK");
			AccountActions.addresstrack(this.toresolve);
			this.type = "address";
		} else {
			console.log("IDTRACK");
			this.type = "id"
			AccountActions.idtrack(this.toresolve);
		}
		// Backbone.history.navigate('report',{trigger: true, replace: true});



		// RippledataActions.markettraders(null,true); //FULL MARKETTRADERS

		// var params = {
		// 		base : {
		// 		    currency : "XRP",
		// 		    issuer : "",
		// 		},
		// 		counter : {
		// 		    currency : "USD" ,
		// 		    issuer   : "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"
		// 		},
		// 		period : "7d",
		// 		transactions:"true",
		// 		format:"json"
		// }
		// RippledataActions.markettraders([params],false);
	
	},

	_onWrongId: function() {
		console.log("THIS ADDRESS OR NAME DOESN'T EXIST!!!");
	},

	_onRightId: function() {
		var params = {
			conf: this.conf,
			address: this.address,
			type: this.type
		}
		Backbone.history.navigate('update/'+JSON.stringify(params),{trigger: true});
	},

	handleKeyPress: function(e) {
		if (e.which == 13) this.handleClick();
	},

	render: function(){

		return ( 
		 <div id="search">
                  <input onKeyPress={this.handleKeyPress} type="text"  placeholder="Enter a ripple address"/>
                  <i onClick={this.handleClick}  className="fa fa-search"></i>
         </div>
		)
		
	}
});

module.exports = SearchBar;