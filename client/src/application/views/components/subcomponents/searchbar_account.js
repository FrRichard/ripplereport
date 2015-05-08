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
var Account = require('Account');
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
		var isloading;
		return {isloading: false};
	},


	handleClick: function() {
		var self = this;
		this.setState({isloading:true});


		// var input = $('#search input').val();
		// this.toresolve = input.split(",");
		// console.log("===================+++> USER INPUT",this.toresolve);
		// this.address = "address" + this.toresolve.length;

		// this.conf = Config.dashboards.account;
		// this.conf['reportnumber']= this.toresolve.length;
		// DashboardActions.registerconf(this.conf);				

		// _.each(gatewaysnames, function(gateway) {
		// 	if(self.toresolve[0] == gateway.address || self.toresolve[0] == gateway.name) {
		// 		self.conf = Config.dashboards.gateway;
		// 		self.conf['reportnumber']= self.toresolve.length;
		// 		DashboardActions.registerconf(self.conf);
		// 	}
		// });
		

		// if(addressvalidator.decode(this.toresolve[0])) {
		// 	console.log("=========================++++>VIEW detects Address");
		// 	this.type = "address";
		// 	AccountActions.addresstrack(this.toresolve);
		// } else if(this.toresolve[0][0] == "~") {
		// 	console.log("==========================++++>VIEW detects ~name");
		// 	this.type = "id"
		// 	AccountActions.idtrack(this.toresolve);
		// }

	},


	handleKeyPress: function(e) {
		if (e.which == 13) this.handleClick();
	},

	render: function(){

		return ( 
		 <div id="search">
                  <input onKeyPress={this.handleKeyPress} type="text"  placeholder="Enter a ripple address"/>
                  <i onClick={this.handleClick}  className="fa fa-search searchbutton">
	                  {this.state.isloading ?
	                  	<div><img className="loading_search" src={'./img/loading2.gif'} /></div> 
	                  : ""}
                  </i>
         </div>
		)
		
	}
});

module.exports = SearchBar;
		



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