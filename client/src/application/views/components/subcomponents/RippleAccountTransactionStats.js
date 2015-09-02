var React = require('react');
var RippleaccounttransactionstatsStore = require('AccountTransactionstatsStore');
var BarChart = require('BarChartReact');
var Table = require('react-bootstrap').Table;
var ViewCommon = require('ViewCommon');


function getRippleaccounttransactionstatsState(key) {
	var rippleaccounttransactionstats= RippleaccounttransactionstatsStore.getSpecific(key);
	return {
		id: new Date().getTime(),
		rippleaccounttransactionstats:rippleaccounttransactionstats
	}
}

var RippleAccountTransactionStats = React.createClass({

	getInitialState: function() {
		rippleaccounttransactionstats={};
		return { rippleaccounttransactionstats:rippleaccounttransactionstats};
	},


	componentWillMount: function() {

	},

	componentDidMount: function() {
		var key = this.props.attributes.reportnumber;
		var address = "address" + key;
		RippleaccounttransactionstatsStore.addChangeListener(address, this._onChangeRippleaccounttransactionstats);
	},

	componentWillUnmount: function() {
		RippleaccounttransactionstatsStore.removeChangeListener(this._onChangeRippleaccounttransactionstats);
	},

	render: function() {
		var self =this;
		var panelstyle = { height:300+'px'};
		this.chartId= "TransactionStats" +this.props.attributes.key;
		this.datasets = {
			results: {
				AccountSet:"", Payment:"",TrustSet:"",OfferCancel:"",OfferCreate:""
			}
		}
		var rows = [];
		if( this.state.rippleaccounttransactionstats["address" + this.props.attributes.reportnumber] != undefined) {
			//Chart
			this.datasets = this.state.rippleaccounttransactionstats["address" + this.props.attributes.reportnumber].results;
     		var barchart= <BarChart id={"transactionsstatschart"} size={[230,160]} data={this.datasets} />
     		//Table rows
 			rows.push(
 				<tr key="transactionstatsresults">
     				<td key="accountset"> { self.datasets.AccountSet } </td>
	          		<td key="trustset"> { self.datasets.TrustSet } </td>
	          		<td key="payment"> { self.datasets.Payment } </td>
	          	</tr>
 			);

   		}
  	
		this.address= "address" + this.props.attributes.reportnumber;
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
	          	<div className="panel-body" style={panelstyle}>
	          		<div id={this.chartId ? this.chartId: ''} className="transactionstats"></div>
	          		{barchart}
	          		 <Table striped bordered condensed hover>
	                    <thead>
	                      <th> AccountSet </th>
	                      <th> TrustSet </th>
	                      <th> Payment </th>
	                    </thead>     
	                    <tbody>
	                      {rows}    
	                    </tbody>
              		</Table>
				</div>
			</div>
		);
	},

	_onChangeRippleaccounttransactionstats: function() {
		var key = this.props.attributes.reportnumber;
		this.address= "address" + key;
		this.setState(getRippleaccounttransactionstatsState("address" + key));
	}

});

module.exports = RippleAccountTransactionStats;