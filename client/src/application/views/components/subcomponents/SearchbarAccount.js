var React = require('react');
var Config = require('Config');
var AccountActions = require('AccountActions');
var DashboardActions = require('DashboardActions');

var RippleidStore = require('IdStore');
var RippleinfosStore = require('InfosStore');


var gatewaysnames = require('GatewayNames');

var AccountoverviewStore = require('AccountOverviewsStore');
var addressvalidator = require('AddressValidator');
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
		RippleidStore.addChangeListener("api_unavailable", this._onUnavailableApi);
		RippleinfosStore.addChangeListener("rightaddress_frominfosstore", this._onRightId);
		RippleinfosStore.addChangeListener("wrongaddress_frominfosstore", this._onWrongId);
	},



	handleClick: function() {
		var self = this;
		this.setState({isloading:true});

		var input = $('#search input').val();
		this.toresolve = input.split(",");
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
		
		if(input != '') {
			if(addressvalidator.decode(this.toresolve[0])) {
				this.type = "address";
				window.location.pathname = "/app/" + this.toresolve[0];
				// AccountActions.addresstrack(this.toresolve);
			} else if(this.toresolve[0][0] == "~") {
				this.type = "id"
				AccountActions.idtrack(this.toresolve);
			}
		} else {
			this._onWrongId();
		}

	},


	handleKeyPress: function(e) {
		if (e.which == 13) this.handleClick();
	},

	render: function(){
		if(!this.state.isloading) {
			var searchlogo = <i  onClick={this.handleClick}   className="fa fa-search searchbutton"></i>;
		} 
		if(this.state.isloading) {
			var searchlogo = <img className="loading_search"  src={'/img/loading2.gif'} />;
		}

		if(this.state.isloading == "valid") {
			var searchlogo = <i className="loading_search" id="searchvalidid" className="fa fa-check checkrightid"></i>;
		}

		if(this.state.isloading == "nonvalid") {
			var searchlogo = <i onClick={this.handleClick}   className="fa fa-search searchbutton"></i>;
			var errormsg = <div className ="errormsg"> This ~name or address has not been found </div>;
		}

		if(this.state.isloading == "unavailableapi") {
			var searchlogo = <i onClick={this.handleClick}   className="fa fa-search searchbutton"></i>;
			var errormsg = <div className ="errormsg"> It seems the Ripple API is not available, try with an address </div>;
		}

		return ( 
		 <div id="search" className="search search_account">
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
    },

    _onUnavailableApi: function() {
    	var self = this;
    	this.setState({isloading:"unavailableapi"});
    }


});

module.exports = SearchBar;