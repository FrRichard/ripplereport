var React = require('react');
var Config = require('config');
var AccountActions = require('AccountActions');
var DashboardActions = require('DashboardActions');
var RippledataActions = require('RippledataActions')
var approuter = require('AppRouter');
var gatewaysnames = require('gatewayNames');
var EventsController = require('EventsController');
/** @jsx React.DOM */


var SearchBar = React.createClass({

	getInitialState: function() {
		return null;
	},

	handleClick: function() {
		var input = $('#search input').val();
		toresolve = input.split(",");
		var conf = Config.dashboards.account;
		conf['reportnumber']= toresolve.length;
		DashboardActions.registerconf(conf);
		_.each(gatewaysnames, function(gateway) {
			if(toresolve[0] == gateway.address || toresolve[0] == gateway.name) {
				conf = Config.dashboards.gateway;
				DashboardActions.registerconf(conf);
			}
		});

		// in this order to avoid dispatch in a dispatch
		AccountActions.rippleid(toresolve);
		Backbone.history.navigate('report',{trigger: true, replace: true});



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

		// var orderGrid = function() {
		// 	var $ungrid = $('.gridster >ul').children();

		// };

		// var loadGrid = function() {
		// 	var gridsterChildren = GridStore.getSpecific('current');
		// 	var gridsterKeys = [];

		// 	_.each(gridsterChildren.current.$widgets, function(children) {
		// 		var isdatatype = $(children).attr("datatype");
		// 		if(isdatatype!="undefined") {
		// 			gridsterKeys.push($(children).attr("id"));
		// 		}
		// 	});
		// 	console.log("gridsterkeys",gridsterKeys);
		// 	AccountActions.rippleid(toresolve,gridsterKeys);
		// }


		// var existingblock = ($('.gridster >ul').children().length);
		// var neededblock = Config.dashboards.account.items.length*toresolve.length;
		// var todelete = {start:(neededblock),end:existingblock};
		// var toadd = (neededblock/3)-(existingblock/3);

		// if( neededblock > existingblock ) {

		// 	var blocknum = existingblock/3;
		// 	for(i=0; i<toadd; i++) {
		// 		var newBlock = [];
		// 		_.each(Config.dashboards.account.items, function(itemtoclone) {
		// 			newBlock.push(_.clone(itemtoclone));
		// 		});
		// 		DashboardActions.addwidget(newBlock,blocknum);
		// 		blocknum = blocknum+1;
		// 	}
		// 	loadGrid($('.gridster >ul').children());

		// } else if( existingblock > neededblock) {	
		// 	var removewidget = DashboardActions.removewidget(todelete);	
		// }else {
		// 	loadGrid($('.gridster >ul').children());

		// };
	
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