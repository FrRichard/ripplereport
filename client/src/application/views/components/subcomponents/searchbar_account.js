var React = require('react');
var Config = require('config');
var AccountActions = require('AccountActions');
var DashboardActions = require('DashboardActions');

var RippleidStore = require('RippleidStore');
var RippleinfosStore = require('RippleinfosStore');


var gatewaysnames = require('gatewayNames');

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

	componentDidMount: function() {
		RippleidStore.addChangeListener("rightaddress_fromidstore", this._onRightId);
		RippleidStore.addChangeListener("wrongaddress_fromidstore", this._onWrongId);
		RippleinfosStore.addChangeListener("rightaddress_frominfosstore", this._onRightId);
		RippleinfosStore.addChangeListener("wrongaddress_frominfosstore", this._onWrongId);
	},



	handleClick: function() {
		var self = this;
		this.setState({isloading:true});

		var input = $('#search input').val();
		this.toresolve = input.split(",");
		console.log("===================+++> USER INPUT",this.toresolve);
		this.address = "address" + this.toresolve.length;

		this.conf = Config.dashboards.account;
		this.conf['reportnumber']= this.toresolve.length;
		DashboardActions.registerconf(this.conf);				

		_.each(gatewaysnames, function(gateway) {
			if(self.toresolve[0] == gateway.address || self.toresolve[0] == gateway.name) {
				self.conf = Config.dashboards.gateway;
				self.conf['reportnumber']= self.toresolve.length;
				DashboardActions.registerconf(self.conf);
			}
		});
		

		if(addressvalidator.decode(this.toresolve[0])) {
			console.log("=========================++++>VIEW detects Address");
			this.type = "address";
			AccountActions.addresstrack(this.toresolve);
		} else if(this.toresolve[0][0] == "~") {
			console.log("==========================++++>VIEW detects ~name");
			this.type = "id"
			AccountActions.idtrack(this.toresolve);
		}

	},


	handleKeyPress: function(e) {
		if (e.which == 13) this.handleClick();
	},

	render: function(){
		console.log("====================LOADSTATE================",this.state.isloading);
		if(!this.state.isloading) {
			var searchlogo = <i  onClick={this.handleClick}   className="fa fa-search searchbutton"></i>;
		} 
		if(this.state.isloading) {
			console.log("newlogo!");
			var searchlogo = <img className="loading_search"  src={'./img/loading2.gif'} />;
		}

		if(this.state.isloading == "valid") {
			var searchlogo = <i id="searchvalidid" className="fa fa-check checkrightid"></i>;
		}

		if(this.state.isloading == "nonvalid") {
			var searchlogo = <i id="searchwrongid" className="fa fa-times checkwrongid"></i>;
			var errormsg = <div className ="errormsg"> This ~name or address has not been found </div>;
		}

		// var searchlogo = <div> COUCOU! </div>;
		return ( 
		 <div id="search">
			<input onKeyPress={this.handleKeyPress} type="text"  placeholder="Enter a ripple address or a ~name" className="searchinput"/>			
			{searchlogo}
			{errormsg}
         </div>
		)		
	},

	_onRightId: function() {
		var self = this;
    	this.setState({isloading:"valid"});
		setTimeout(function() {
			self.setState({isloading: false});
		}, 1500)
    },

    _onWrongId: function() {
    	var self = this;
    	this.setState({isloading:"nonvalid"});
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