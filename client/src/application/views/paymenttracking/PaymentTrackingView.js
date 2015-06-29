var React = require('react');
var Actions = require('AccountActions');
var PaymentStore = require('AccountTransactionsStore');

var Paymenttracking = React.createClass({

	getInitialState: function() {
		var id = "address0"; 
		return  {
			width:"",
			depth:"",
			id:id,
			address:"",
			addressList:[],
			nodes:{}
		};
	},

	componentDidMount: function() {
	},


	render: function() {		
		console.log("STATE:", this.state);
		return (
			<div>
				<input onKeyPress={this.handleKeyPress} type="text"  placeholder="Enter a ripple address" className="searchinput"/>	
				<label htmlFor={"selectWidth"}> Width </label>
				<select id={"selectWidth"} value={5}>
					<option value={1}> 1 </option>
					<option value={2}> 2 </option>
					<option value={3}> 3 </option>
					<option value={4}> 4 </option>
					<option value={5}> 5 </option>
				</select>
				<label htmlFor={"selectDepth"}> Depth </label>
				<select id={"selectDepth"} value={2}>
					<option value={1}> 1 </option>
					<option value={2}> 2 </option>
				</select>
				<label htmlFor={"selectCurrency"}> Currency </label>
				<select id={"selectCurrency"} value={"USD"}>
					<option value="USD"> USD </option>
					<option value="XRP"> XRP </option>
				</select>
			</div>);
	},

	handleKeyPress: function(e) {
		if (e.which == 13) this.startTracking(e);
	},

	startTracking: function(e) {
		console.log("startTracking ...");
		PaymentStore.removeAllListeners();
		var address = $('.searchinput').val();
		var width = $('#selectWidth').val();
		var depth = $('#selectDepth').val();
		var currency = $('#selectCurrency').val();
		var nbrListeners = width * depth;

		for(i = 0; i<nbrListeners; i++) {
			PaymentStore.addChangeListener("address"+i,this._onPaymentUpdate("address" + i));
		}

		var account = {
			address:address,
			id:this.state.id
		};

		var nodes = this.state.nodes;
		nodes['address0'] = {
			parent:null,
			address: address,
			data: "",
			nodes: {},
			childs: []
		}
		var addressList = this.state.addressList;
		addressList.push(address);
		this.setState({
			width: width,
			depth: depth,
			currency: currency,
			address: address,
			addressList: addressList,
			nodes: nodes
		});

		this.count = 0;

		Actions.rippleaccounttransactions([account],this.props.params);
	},

	_onPaymentUpdate: function(id) {
		var self = this;
		return function() {

			var nodes = self.state.nodes;
			var payload = PaymentStore.getSpecific(id);
			console.log("PÄYLOAD",payload,id);
			var i = 0;

			// while(address == self.checkAddressList(address) ) {
			// 	i++;
			// 	var address = payload[self.state.id].summary.top10['USD'].sent[i].counterparty;
			// }
			// function isChild(address) {
			// 	_.each(self.state.nodes, function(node, key) {
			// 		var c = _.find(node.childs, function(child) {
			// 			return child == address;
			// 		});
			// 		if(c) {

			// 		}
			// 	});
			// }
			var top10 = payload[id].summary.top10['USD'].sent;


			for(i=0; i<self.state.width && i<top10.length; i++) {
				var address = payload[id].summary.top10['USD'].sent[i].counterparty;
				if(self.state.nodes[id] != null) {
					var parent = self.state.nodes[id] + ':' + id;
				};
				var account = {
					address: address,
					id: "address"+ self.count,
					parent: parent
				};
				nodes[id].childs.push(address);
				Actions.rippleaccounttransactions([account], self.props.params);
				self.count++;
			}

			// self.count++;
			// Actions.rippleaccounttransactions([account],self.props.params);
			var addressList = self.state.addressList;
			console.log("push:","address"+id,address);
			addressList.push(address);
			
			nodes[id].data = payload[id].summary.top10[self.state.currency].sent;

			self.setState({
				id: id,
				address: address,
				addressList: addressList,
				nodes:nodes
			});
		}
	},

	checkAddressList: function(address) {
		var res = _.find(this.state.addressList, function(al) {
			return address == al;
		});
		return res;
	}


});




module.exports = Paymenttracking;