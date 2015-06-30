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
		PaymentStore.addChangeListener('change',this._onPaymentUpdate);
	},


	render: function() {		
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
				</select>
				<label htmlFor={"selectDepth"}> Depth </label>
				<select id={"selectDepth"} defaultValue={2}>
					<option value={1}> 1 </option>
					<option value={2}> 2 </option>
				</select>
				<label htmlFor={"selectCurrency"}> Currency </label>
				<select id={"selectCurrency"} defaultValue={"USD"}>
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
		var address = $('.searchinput').val().trim();
		var width = $('#selectWidth').val();
		var depth = $('#selectDepth').val();
		var currency = $('#selectCurrency').val();
		var nbrListeners = width * depth;

		// for(i = 0; i<nbrListeners; i++) {
		// 	PaymentStore.addChangeListener("address"+i,this._onPaymentUpdate("address" + i));
		// }

		var account = {
			address: address,
			id: address,
			parent: "origin"
		};

		var nodes = this.state.nodes;
		nodes['address0'] = {
			parent:"origin",
			address: address,
			data: "",
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
		this.depthExplored = 0;
		var filterParams = {
			depth: depth,
			width: width,
			currency: currency
		}

		Actions.accounttransactionstrack([account],this.props.params, filterParams);
	},

	_onPaymentUpdate: function() {
		// console.log("VIEWSTORE UPDATE",PaymentStore.getAll());
		// var payload = PaymentStore.getSpecific(id);
		// console.log("payload: ",payload);
		// if(self.depthExplored <= self.state.depth) {
		// 	console.log("DEPPPPPPPPPPPPPPPPPTHTHHTHTHTH",self.depthExplored);
		// 	var nodes = self.state.nodes;
		// 	var payload = PaymentStore.getSpecific(id);
		// 	console.log("PÄYLOAD",payload,id);
		// 	var i = 0;

		// 	var top10 = payload[id].summary.top10['USD'].sent;
		// 	var parent = id;
		// 	console.log("FUCKINGlength",top10.length);
		// 	for(i=0; i<self.state.width && i<top10.length; i++) {
		// 		var address = top10[i].counterparty;
		// 		var account = {
		// 			address: address,
		// 			id: "address"+ self.count,
		// 			parent: parent
		// 		};
		// 		// console.log("NOOOODOES.id", nodes[id]);
		// 		if(!nodes[id]) {
		// 			nodes[id] = {
		// 				parent: payload[id].parent,
		// 				address: address,
		// 				data: "",
		// 				childs: []
		// 			}
		// 		}
		// 		nodes[id].childs.push(address);
		// 		Actions.rippleaccounttransactions([account], self.props.params);
		// 		self.count += 1;
		// 	}

		// 	var addressList = self.state.addressList;
		// 	console.log("push:","address"+id,address);
		// 	addressList.push(address);
			
		// 	nodes[id].data = payload[id].summary.top10[self.state.currency].sent;

		// 	self.setState({
		// 		id: id,
		// 		address: address,
		// 		addressList: addressList,
		// 		nodes:nodes
		// 	});
		// 	self.depthExplored +=1;
		// }
		
	},

	checkAddressList: function(address) {
		var res = _.find(this.state.addressList, function(al) {
			return address == al;
		});
		return res;
	}


});




module.exports = Paymenttracking;