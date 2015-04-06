var React = require('react');
var RippleaccounttransactionsStore = require('RippleaccounttransactionsStore');


function getRippleaccounttransactionsState(key) {
	var rippleaccounttransactions= RippleaccounttransactionsStore.getSpecific(key);
	return {
		id: new Date().getTime(),
		rippleaccounttransactions:rippleaccounttransactions
	}
}

var RippleAccountTransactions = React.createClass({

	getInitialState: function() {
		rippleaccounttransactions={};
		return { rippleaccounttransactions:rippleaccounttransactions};
	},


	componentWillMount: function() {

	},

	componentDidMount: function() {
		var key = this.props.attributes.reportnumber;
		var address = "address" + key;
		RippleaccounttransactionsStore.addChangeListener(address, this._onChangeRippleaccounttransactions);
	},

	componentWillUnmount: function() {
		RippleaccounttransactionsStore.removeChangeListener(this._onChangeRippleaccounttransactions);
	},

	render: function() {
		var self =this;
		// console.log("RIPPLECAPITALIZATIONSTATE",this.state.ripplecapitalization);
			// {this.state.ripplecapitalization[this.address] ?
			// 		_.map(this.state.ripplecapitalization[this.address],function(cap) {
			// 			return  <ul>
			// 						<li> { cap.currency } { cap.amount } </li>
			// 					</ul>;

			// 		})

			// 	: ""}
		this.address= "address" + this.props.attributes.reportnumber;
		return (<div>
			<p> hello! ripple account_transactions ! Transaction_type: Payment !!</p>
		</div>);
	},

	_onChangeRippleaccounttransactions: function() {
		var key = this.props.attributes.reportnumber;
		this.address= "address" + key;
		this.setState(getRippleaccounttransactionsState("address" + key));
	}

});

module.exports = RippleAccountTransactions;