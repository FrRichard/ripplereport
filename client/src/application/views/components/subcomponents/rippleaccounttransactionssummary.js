var React = require('react');
var RippleaccounttransactionsStore = require('RippleaccounttransactionsStore');
//react-bootstrap
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Accordion = require('react-bootstrap').Accordion;
// css
var viewcommon =require('ViewCommon');
//common
var CollapsableRow = require('CollapsableRow');


function getRippletransactionsState(key) {
	var rippletransactions= RippleaccounttransactionsStore.getSpecific(key);
	return {
		id: new Date().getTime(),
		rippletransactions:rippletransactions
	}
}

var RippleAccountTransactionsSummary = React.createClass({

	getInitialState: function() {
		rippletransactions = {};
		selectedpaymenttype = "received";
		selectedpaymenttype_total = "received";
		return { rippletransactions:rippletransactions, selectedpaymenttype:selectedpaymenttype, selectedpaymenttype_total:selectedpaymenttype_total};
	},


	componentWillMount: function() {

	},

	componentDidMount: function() {
		var key = this.props.attributes.reportnumber;
		var address = "address" + key;
		RippleaccounttransactionsStore.addChangeListener(address, this._onChangeRippleaccounttransactionssummary);
	},

	componentWillUnmount: function() {
		RippleaccounttransactionsStore.removeChangeListener(this._onChangeRippleaccounttransactionssummary);
	},

	render: function() {
		var self =this;
		var ofexsum_titlestyle = viewcommon.ofexsum_title;
		var ofexsum_top10 = viewcommon.ofexsum_top10;
		var doubleselectorstyle = viewcommon.doubleselector;
		var rows = [];
		var rows2 = [];

		this.address= "address" + this.props.attributes.reportnumber;

		if(this.state.rippletransactions[this.address]) {

			var optioncurrencies = _.map(this.state.rippletransactions[this.address].summary.top10 ,function(d,currency) {
				return <option key={"optionpayments"+currency} value={currency}>{currency}</option> 
			});

			var top10 = this.state.rippletransactions[this.address].summary.top10[this.state.selectedcurrency][this.state.selectedpaymenttype];

			_.each(top10, function(payment,i){
				if(payment.type == "received") {
					var content = <span> {payment.currency}: {payment.amount} sender:{payment.counterparty} </span>;
				} else {
					var content = <span> {payment.currency}: {payment.amount} receiver:{payment.counterparty} </span>;
				}

				var hiddencontent = <span> {payment.time} issuer: {payment.issuer} </span>;

				rows.push(   
					<tr className="offerexercisedrow"> 
							<td>  <CollapsableRow content={content} offertype={self.state.selectedpaymenttype}> {hiddencontent} </CollapsableRow>
						</td>
					</tr>
				);


			});

			var currency_total = this.state.rippletransactions[this.address].summary[this.state.selectedcurrency_total];
			function emptyfield() {
				rows2.push(
					<tr className="offerexercisedrow"> 
						<td>  Nothing ! Go fuck yourself !
						</td>
					</tr>
				);
			}

			_.each(currency_total, function(issuer, issuerkey) {
				var selectedpaymenttype_total = self.state.selectedpaymenttype_total;
				if(self.state.selectedcurrency_total != "XRP") { 
					if(issuer[self.state.selectedpaymenttype_total]) {
						var content = <span> {self.state.selectedcurrency_total}: {issuer[self.state.selectedpaymenttype_total].amount}
						Number of payments: {issuer[self.state.selectedpaymenttype_total].count} issuer: {issuerkey} </span>;
						
						rows2.push(
							<tr className="offerexercisedrow"> 
								<td>  {content}  
								</td>
							</tr>
						);
					} else { emptyfield(); }
				} else {
					if(currency_total[self.state.selectedpaymenttype_total]) {
						var content = <span> {self.state.selectedcurrency_total}: {currency_total[self.state.selectedpaymenttype_total].amount} 
						Number of payments: {currency_total[self.state.selectedpaymenttype_total].count} </span>

						rows2.push(
							<tr className="offerexercisedrow"> 
								<td>  {content}  
								</td>
							</tr>
						);
					} else { emptyfield(); }
				}
			});

		}


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
				<div className="panel-body" style={ofexsum_top10}>
						    <Table striped bordered condensed hover  >
			                    <thead>
									<th colSpan={2}> 
										<span style={ofexsum_titlestyle}>Top 10 payments </span>
										{ this.state.rippletransactions[this.address] ?
											<span>
												<select style={doubleselectorstyle} onChange={this.onSelectPaymentType} value={this.state.selectedpaymenttype}>
													<option key={"optionsent"} value={"sent"}> SENT </option>
													<option key={"optionreceived"} value={"received"}> RECEIVED </option>
												</select>
												<select onChange={this.onSelectCurrency} style={doubleselectorstyle} value={this.state.selectedcurrency}>
													{optioncurrencies}
												</select>
											</span>
										: "" }
									</th>							
							
			                    </thead>     
			                    <tbody>
			                       {rows}  
			                    </tbody>
		              		</Table>
				</div>
				<div className="panel-body" style={ofexsum_top10}>
					    <Table striped bordered condensed hover  >
		                    <thead>
								<th colSpan={2}> 
									<span style={ofexsum_titlestyle}>Total payments </span>
									{ this.state.rippletransactions[this.address] ?
										<span>
											<select style={doubleselectorstyle} onChange={this.onSelectPaymentType_total} value={this.state.selectedpaymenttype_total}>
												<option key={"optionsent_total"} value={"sent"}> SENT </option>
												<option key={"optionreceived_total"} value={"received"}> RECEIVED </option>
											</select>
											<select onChange={this.onSelectCurrency_total} style={doubleselectorstyle} value={this.state.selectedcurrency_total}>
												{optioncurrencies}
											</select>
										</span>
									: "" }
								</th>							
						
		                    </thead>     
		                    <tbody>
		                       {rows2}  
		                    </tbody>
	              		</Table>
				</div>
			</div>
		);
	},

	_onChangeRippleaccounttransactionssummary: function() {
		var key = this.props.attributes.reportnumber;
		this.address= "address" + key;
		var data = getRippletransactionsState("address" + key);
		var defaultcurrency = Object.keys(data.rippletransactions[this.address].summary.top10)[0];
		this.setState({ 
			rippletransactions: data.rippletransactions, 
			selectedcurrency:defaultcurrency, 
			selectedcurrency_total:defaultcurrency,
			selectedpaymenttype:"received",
			selectedpaymenttype_total:"received"
		 });
	},

	onSelectPaymentType: function(e) {
		var paymenttype = $(e.target).val();
		this.setState( { selectedpaymenttype:paymenttype } );
	},

	onSelectCurrency: function(e) {
		var currency = $(e.target).val();
		this.setState( { selectedcurrency:currency });
	},

	onSelectPaymentType_total: function(e) {
		var paymenttype = $(e.target).val();
		this.setState( { selectedpaymenttype_total:paymenttype } );
	},

	onSelectCurrency_total: function(e) {
		var currency = $(e.target).val();
		this.setState( { selectedcurrency_total:currency });
	}

});

module.exports = RippleAccountTransactionsSummary;