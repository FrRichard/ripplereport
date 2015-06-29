var React = require('react');
var Actions = require('AccountActions');
var PaymentStore = require('AccountTransactionsStore');

var Paymenttracking = React.createClass({

	getInitialState: function() {
		var id = "address0"; 
		return  {
			id:id,
			address:"",
			addressList:[]
		};
	},

	componentDidMount: function() {
		PaymentStore.addAnyChangeListener("change", this._onPaymentUpdate);
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
		var account = {
			address:address,
			id:this.state.id
		};
		this.count = 0;
		var addressList = this.state.addressList;
		addressList.push(address);
		this.setState({
			address: address,
			addressList: addressList
		});
		console.log(this.state);
		Actions.rippleaccounttransactions([account]);
	},

	_onPaymentUpdate: function(payload) {

		if(this.count < 10) {	
			var payload = PaymentStore.getSpecific(this.state.id);
			var i = 0;
			var address = payload[this.state.id].summary.top10['USD'].sent[i].counterparty;
			// console.log("compare address_ INWHILE addresstop10",address, "this.state.address:", this.state.address);

			console.log("checkaddreslist_result",this.checkAddressList(address));

			while(address == this.checkAddressList(address) ) {
				// console.log("compare address_ INWHILE",address, this.state.address);
				i++;
				var address = payload[this.state.id].summary.top10['USD'].sent[i].counterparty;
			}
			// console.log("address new",address, "addressList", this.state.addressList);
			this.count++;
			var account = {
				address: address,
				id: "address"+ this.count
			};
			Actions.rippleaccounttransactions([account]);
		}
		// 	// payload:payload
		var addressList = this.state.addressList;
		addressList.push(address);

		console.log(this.state);
		this.setState({
			id: "address" + this.count,
			address: address,
			addressList: addressList
		});
	},

	checkAddressList: function(address) {
		console.log(address, this.state.addressList);
		var res = _.find(this.state.addresslist, function(al) {
			return address == al;
		});

		return res;
	}


});




module.exports = Paymenttracking;