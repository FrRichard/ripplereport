var React = require('react');
var Actions = require('AccountActions');
var PollingActions = require('PollingActions');
var PaymentStore = require('PaymentStore');
var PaymentSummaryStore = require('AccountTransactionsStore');
var IdStore = require('IdStore');
var PaymentGraph = require('PaymentGraphReact');
var PaymentSummary = require('RippleAccountTransactions');


var PaymentTracking = React.createClass({

	getInitialState: function() {
		
		return  {
			width:"",
			depth:"",
			name:name,
			address:"",
			type:"",
			nodes:{},
			lastFetch: [],
			isloading: true
		};
	},

	componentDidMount: function() {
		PaymentStore.addChangeListener('change',this._onPaymentUpdate);
		PaymentStore.addChangeListener('fetch', this._onLastFetch);
		PaymentStore.addChangeListener('addresschange', this._cleanLastFetch);
		IdStore.addChangeListener('change', this._onAddressToName);
	},

	render: function() {		
		console.log("SSTAAATE",this.state);
		if(this.state.isloading) {
			var graph = <img className="loading" src={'./img/loading2.gif'} />;
		} else {
			var graph = <PaymentGraph id={"PaymentChart"} size={[1030,650]} data={this.state}/>;
		}
		var fetchList = [];
		_.each(this.state.lastFetch, function(last) {
			fetchList.push(<div className="fetchlist"> {last.address} </div>); 
		});
		var fetchStatus = <div id="fetchstatus">
			<div> {fetchList} </div>
		</div>
		var stopfetch = <button id="stopfetchingbutton" onClick={this.stopFetchingAll} className="loadingbuttonstop_pymnt"> Stop fetching at this point </button>;
		
		var control = <div id="pymntcontrole">
				<select>
					<option> some shit </option>
					<option> some other shit </option>
				</select>
				{fetchStatus}
			</div>;
				// <input type="checkbox" name="vehicle" value="Bike"/>I have a bike</br>

		return (
			<div className="panel panel-default">
				 <div className="panel-heading clearfix">
					 <div className="panel-title  pull-left" onMouseOver="" onMouseOut="">
	             		<i className={this.props.attributes.icon}></i>
						<span className="panel-title-text">
							{this.props.attributes.title}
						</span>
	       			</div>
	       		</div>
	       		<div className="panel-body">
	       			<div className="graphControl">
	       				{control}
	       			</div>
					<div id="PaymentGraphNode">
						{graph}
					</div>
	       		</div>
	       	</div>
	    );
	},

	_onPaymentUpdate: function() {
		// console.log(this.state);
		var nodes = PaymentStore.getAll();

		this.setState({	
			nodes: nodes,
			isloading:false
		});
	},

	_onLastFetch: function() {
		var last = PaymentStore.getLastFetch();
		console.log(last);
		var lastList = this.state.lastFetch;
		lastList.push(last);
		this.setState({
			lastFetch: lastList
		});
	},

	_cleanLastFetch: function() {
		console.log("cleaaaaaaaaaaaaaaaaaaaaaaannnnnn");
		this.setState({
			lastFetch: []
		});
	},

	_onAddressToName: function() {
		// var nameObject = IdStore.getAll()["address1"];
		// var name = IdStore.getAll()["address1"].username;
		// var address = IdStore.getAll()["address1"].address;
		// var res = {
		// 	name:name,
		// 	address:address
		// }
		// var nodes = this.state.nodes;

		// if(this.state.address  == address) {
		// 	this.setState({
		//  		name:name
		// 	});
		// }

		// _.each(nodes, function(node, key) {
		//  	if(address == key){
		// 		node['name'] = name;
		// 	}
		// });
		// this.setState({
		// 	nodes:nodes
		// });
	
	},

	addAddressToList: function(list,all) {
		// var self = this;
		// _.each(list, function(address) {
		// 	var exists = _.find(self.addressList, function(listed) {
		// 		return address == listed;
		// 	});
		// 	if(!exists) {
		// 		self.addressList.push(address);
		// 		Actions.rippleid([address]);
		// 	}

		// });
	},

	stopFetchingAll: function() {
		PollingActions.stopTransactionRequest();
	}


});




module.exports = PaymentTracking;