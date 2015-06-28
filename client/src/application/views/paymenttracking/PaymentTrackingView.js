var React = require('react');
var Actions = require('AccountActions');
var PaymentStore = require('AccountTransactionsStore');

var Paymenttracking = React.createClass({

	getInitialState: function() {
		return null;
	},

	componentDidMount: function() {
		PaymentStore.addChangeListener("address1", this._onPaymentUpdate);
	},


	render: function() {	
		console.log(this.props.depth);		
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
		var account = {
			address:address,
			id:"addess1"
		};
		Actions.rippleaccounttransactions([account]);
	},

	_onPaymentUpdate: function(payload) {
		var top10 = payload
		for(i = 1; i = this.props.depth; i++) {

		}

		this.setState({
			payload:payload
		});
	}


});




module.exports = Paymenttracking;