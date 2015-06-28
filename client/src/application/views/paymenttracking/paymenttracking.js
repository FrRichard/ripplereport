var React = require('react');
var Actions = require('AccountActions');
var PaymentStore = require('RippleaccounttransactionstatsStore');

var Paymenttracking = React.createClass({

	getInitialState: function() {
		return null;
	},

	componentDidMount: function() {
		PaymentStore.addChangeListener("address1", this._onPaymentUpdate);
	},


	render: function() {
				
		// var userInput =  <span> <button type=button onClick={this.startTracking}> Start Tracking !</button></span>;

		return (
			<div>
				<input onKeyPress={this.handleKeyPress} type="text"  placeholder="Enter a ripple address" className="searchinput"/>	
			</div>);
	},

	handleKeyPress: function(e) {
		if (e.which == 13) this.startTracking(e);
	},

	startTracking: function(e) {
		console.log("startTracking ...");
		var address = $('.searchinput').val();
		console.log(address);
		Actions.rippleaccounttransactionstats([address]);
	},

	_onPaymentUpdate: function(payload) {
		this.setState({
			payload:payload
		});
	}


});




module.exports = Paymenttracking;