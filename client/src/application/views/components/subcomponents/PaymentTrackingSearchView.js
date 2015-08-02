var React = require('react');
var Config = require('Config');
var Actions = require('AccountActions');

var DashboardActions = require('DashboardActions');
var ParametersManagerConfig = require('ParametersManagerConfig');

var RippleidStore = require('IdStore');
var RippleinfosStore = require('InfosStore');
var PaymentStore = require('PaymentStore');

var gatewaysnames = require('GatewayNames');

var addressvalidator = require('AddressValidator');
var Account = require('Account');
var LongPollingSocketManager = require('LongPollingSocketManager');
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



	handleClick: function(e) {
		var self = this;

		this.setState({isloading:true});

		var input = $('#search input').val().trim();
		this.toresolve = input.split(",");
		// console.log("===================+++> USER INPUT",this.toresolve);
		this.address = "address" + this.toresolve.length;

		this.conf = Config.dashboards.paymenttracking;
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
			// console.log("=========================++++>VIEW detects Address");
			this.type = "address";
			Actions.addresstrack(this.toresolve);
			this.startTracking(e);
		} else if(this.toresolve[0][0] == "~") {
			// console.log("==========================++++>VIEW detects ~name");
			this.type = "id"
			Actions.idtrack(this.toresolve);
			this.startTracking(e);
		}

	},


	handleKeyPress: function(e) {
		if (e.which == 13) this.handleClick(e);
	},

	render: function(){
				// 	<input onKeyPress={this.handleKeyPress} type="text"  placeholder="Enter a azdazdazripple address" className="searchinput"/>	
			var selector = <div id="pymnttrackingselector">
				<label htmlFor={"selectWidth"}> Width </label>
				<select id={"selectWidth"} defaultValue={10}>
					<option value={1}> 1 </option>
					<option value={2}> 2 </option>
					<option value={3}> 3 </option>
					<option value={4}> 4 </option>
					<option value={5}> 5 </option>
					<option value={6}> 6 </option>
					<option value={7}> 7 </option>
					<option value={8}> 8 </option>
					<option value={9}> 9 </option>
					<option value={10}> 10 </option>
				</select>
				<label htmlFor={"selectDepth"}> Depth </label>
				<select id={"selectDepth"} defaultValue={10}>
					<option value={1}> 1 </option>
					<option value={2}> 2 </option>
					<option value={3}> 3 </option>
					<option value={4}> 4 </option>
					<option value={5}> 5 </option>
					<option value={6}> 6 </option>
					<option value={7}> 7 </option>
					<option value={8}> 8 </option>
					<option value={9}> 9 </option>
					<option value={10}> 10 </option>
				</select>
				<label htmlFor={"selectCurrency"}> Currency </label>
				<select id={"selectCurrency"} defaultValue={"USD"}>
					<option value="USD"> USD </option>
					<option value="XRP"> XRP </option>
				</select> 
			</div>; 
		// console.log("====================LOADSTATE================",this.state.isloading);
		if(!this.state.isloading) {
			var searchlogo = <i  onClick={this.handleClick}   className="fa fa-search searchbutton"></i>;
		} 
		if(this.state.isloading) {
			var searchlogo = <img className="loading_search"  src={'./img/loading2.gif'} />;
		}

		if(this.state.isloading == "valid") {
			var searchlogo = <i className="loading_search" id="searchvalidid" className="fa fa-check checkrightid"></i>;
		}

		if(this.state.isloading == "nonvalid") {
			var searchlogo = <i id="searchwrongid" className="fa fa-times checkwrongid"></i>;
			var errormsg = <div className ="errormsg"> This ~name or address has not been found </div>;
		}

		return ( 
		 <div id="search" className="search_account">
			<input onKeyPress={this.handleKeyPress} type="text"  placeholder="NOW !Enter a ripple address or a ~name" className="searchinput"/>	
			{selector}		
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

   	startTracking: function(e) {

	},

});

module.exports = SearchBar;
		

