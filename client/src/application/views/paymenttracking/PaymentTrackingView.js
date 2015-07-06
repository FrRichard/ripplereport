var React = require('react');
var Actions = require('AccountActions');
var PaymentStore = require('AccountTransactionsStore');
var IdStore = require('IdStore');
var PaymentGraph = require('PaymentGraphReact');

var PaymentTracking = React.createClass({

	getInitialState: function() {
		var id = "address0"; 
		return  {
			width:"",
			depth:"",
			name:name,
			address:"",
			nodes:{}
		};
	},

	componentDidMount: function() {
		PaymentStore.addChangeListener('change',this._onPaymentUpdate);
		IdStore.addChangeListener('change', this._onAddressToName);

	},

	someshit: function() {
		console.log("SOME SHIT!!!!");
	},


	render: function() {		
		// console.log("STATE", this.state);
		if(Object.keys(this.state.nodes).length > 0) {
			var paymentgraph= <PaymentGraph id={"PaymentChart"} size={[60,30]} data={this.state} />
			// var paymentgraph= <PaymentGraph id={"PaymentChart"} size={[60,30]} data={null} />
		} else {
			var paymentgraph= <PaymentGraph id={"PaymentChart"} size={[60,30]} data={null} />
		}

		return (
			<div>
				<input onKeyPress={this.handleKeyPress} type="text"  placeholder="Enter a azdazdazripple address" className="searchinput"/>	
				<label htmlFor={"selectWidth"}> Width </label>
				<select id={"selectWidth"} defaultValue={5}>
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
				<select id={"selectDepth"} defaultValue={2}>
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
				<div>
					{paymentgraph}
				</div>
			</div>);
	},

	handleKeyPress: function(e) {
		if (e.which == 13) this.startTracking(e);
	},

	startTracking: function(e) {
		var address = $('.searchinput').val().trim();
		console.log("startTracking ...",address);
		var width = $('#selectWidth').val();
		var depth = $('#selectDepth').val();
		var currency = $('#selectCurrency').val();

		var account = {
			address: address,
			id: address,
			parent: "origin"
		};

		this.addressList = [address];

		this.setState({
			depth: depth,
			width: width,
			address: address,
			name: "",
			currency: currency
		});


		var filterParams = {
			depth: depth,
			width: width,
			currency: currency
		}
		Actions.rippleid([address]);
		Actions.accounttransactionstrack([account],this.props.params, filterParams);
	},

	_onPaymentUpdate: function() {
		var nodes = PaymentStore.getAll();
		this.addAddressToList(Object.keys(PaymentStore.getAll()));
		this.setState({	
			nodes: nodes
		});
	},

	_onAddressToName: function() {
		var nameObject = IdStore.getAll()["address1"];
		var name = IdStore.getAll()["address1"].username;
		var address = IdStore.getAll()["address1"].address;
		var nodes = this.state.nodes;

		if(this.state.address  == address) {
			this.setState({
				name:name
			});
		}

		_.each(nodes, function(node, key) {
			if(address == key){
				node['name'] = name;
			}
		});
		this.setState({
			nodes:nodes
		});
	},

	addAddressToList: function(list) {
		var self = this;
		_.each(list, function(address) {
			var exists = _.find(self.addressList, function(listed) {
				return address == listed;
			});
			if(!exists) {
				self.addressList.push(address);
				Actions.rippleid([address]);
			}

		});
	}


});




module.exports = PaymentTracking;