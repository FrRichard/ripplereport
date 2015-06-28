var React = require('react');
var RippleaccounttransactionsStore = require('AccountTransactionsStore');
//react-bootstrap
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Accordion = require('react-bootstrap').Accordion;
var Button = require('react-bootstrap').Button;
// css
var viewcommon =require('ViewCommon');
//common
var CollapsableRow = require('CollapsableRow');
//Utils
var FormatUtils = require("FormatUtils");
var gatewayNames = require('GatewayNames');
var moment = require('moment');

function getRippletransactionsState(key) {
	var rippletransactions= RippleaccounttransactionsStore.getSpecific(key);
	return {
		id: new Date().getTime(),
		rippletransactions:rippletransactions
	}
}

var RippleAccountTransactionsSummary = React.createClass({

	getInitialState: function() {
		var rippletransactions = {};
		var selectedpaymenttype = "received";
		var selectedpaymenttype_total = "received";
		var isloading = true;
		return { 
			rippletransactions:rippletransactions, 
			selectedpaymenttype:selectedpaymenttype, 
			selectedpaymenttype_total:selectedpaymenttype_total,
			isloading:isloading
		};
	},


	componentWillMount: function() {

	},

	componentDidMount: function() {
		var key = this.props.attributes.reportnumber;
		var address = "address" + key;
		RippleaccounttransactionsStore.addChangeListener(address, this._onChangeRippleaccounttransactionssummary);
		RippleaccounttransactionsStore.addChangeListener("isloading", this._onLoading);
	},

	componentWillUnmount: function() {
		RippleaccounttransactionsStore.removeChangeListener(this._onChangeRippleaccounttransactionssummary);
	},

	render: function() {
		var self =this;
		var ofexsum_titlestyle = viewcommon.ofexsum_title;
		var ofexsum_top10 = viewcommon.ofexsum_top10;
		var ofexsum_top10table = viewcommon.ofexsum_top10table;
		var doubleselectorstyle = viewcommon.doubleselector;
		var rows = [];
		var rows2 = [];

		this.address= "address" + this.props.attributes.reportnumber;

		if(this.state.rippletransactions[this.address]) {
			if(this.state.rippletransactions[this.address].transactions.length > 0) {
				var optioncurrencies = _.map(this.state.rippletransactions[this.address].summary.top10 ,function(d,currency) {
					return <option key={"optionpayments"+currency} value={currency}>{currency}</option> 
				});

				var top10 = this.state.rippletransactions[this.address].summary.top10[this.state.selectedcurrency][this.state.selectedpaymenttype];

				_.each(top10, function(payment,i){
					
					payment.date = moment(payment.time).format('MMMM Do YYYY, h:mm:ss a');
					if( payment.direction == "cashin") {
						var paymentdirection = "paymentcashin";
						var directioncom ="directioncashin";
						var paymentd = "Cash In";
					} else if( payment.direction == "cashout") {
						var paymentdirection = "paymentcashout";
						var directioncom = "directioncashout";
						var paymentd = "Cash Out";
					} else {
						var paymentdirection = "";
						var directioncom="directionstandard";
						var paymentd = "Standard";
					}
					if(payment.type == "received") {
						var address = { address:payment.counterparty};
						var content = 
							<span key={"transactiontop10_block"+i}>
								<span key={"transactiontop10_amount"+i} className="offersexercisedamount">{payment.currency} {FormatUtils.formatValue(payment.amount)}</span>
								<span key={"transactiontop10_date"+i} className="offersexerciseddate">{payment.date}</span>
								<span key={"transactiontop10_issuer"+i} className="offersexercisedissuer"> Sender: <a href={"/app?"+JSON.stringify(address)} target="_blank" value={payment.counterparty}> {payment.counterparty}</a></span>
								<span key={"transactiontop10_direction"+i} className="direction"> Direction: <span className={directioncom}> {paymentd} </span> </span>
							</span>;
					} else {
						var address = { address:payment.counterparty};
						var content = 
							<span  key={"transactiontop10_block"+i}>
								<span key={"transactiontop10_amount"+i} className="offersexercisedamount">{payment.currency} {FormatUtils.formatValue(payment.amount)}</span>
								<span key={"transactiontop10_date"+i} className="offersexerciseddate">{payment.date}</span>
								<span key={"transactiontop10_issuer"+i} className="offersexercisedissuer">Receiver:<a href={"/app?"+JSON.stringify(address)} target="_blank" value={payment.counterparty}> {payment.counterparty}</a></span>
								<span key={"transactiontop10_direction"+i} className="direction"> Direction: <span className={directioncom}> {paymentd} </span> </span>
							</span>;
					}
					if(payment.currency == 'XRP') {
						var hiddencontent = <span key={"xrphiddencontentsum_block"+i} ></span>; 
					} else {
						var address = { address:payment.issuer};
						var hiddencontent = 
							<span  key={"transactiontop10_block_hidden"+i} className="offersexercisedissuer">
								Issuer: <a key={"transactiontop10_href"+i} href={"/app?"+JSON.stringify(address)} target="_blank" value={payment.issuer}>{payment.issuer}</a>
							</span>;
					}


					rows.push(   
						<tr key={"transactiontop10_hidden_row"+i} className={"offerexercisedrow " +paymentdirection} >
								<td key={"transactiontop10_hidden"+i}>  <CollapsableRow content={content} offertype={self.state.selectedpaymenttype}> {hiddencontent} </CollapsableRow></td>
						</tr>
					);


				});

				var currency_total = this.state.rippletransactions[this.address].summary[this.state.selectedcurrency_total];
				function emptyfield() {
					rows2.push(
						<tr key={"transactionsum_nothing_table"} className="offerexercisedrow"> 
							<td key={"transactionsum_nothing"+moment()}>  No transactions for this currency!
							</td>
						</tr>
					);
				}

				_.each(currency_total, function(issuer, issuerkey) {
					var selectedpaymenttype_total = self.state.selectedpaymenttype_total;
					if(self.state.selectedcurrency_total != "XRP") { 
						if(issuer[self.state.selectedpaymenttype_total]) {
							var Issuer = <a href={"/app?"+JSON.stringify(issuerkey)} target="_blank" value={issuerkey}> {issuerkey}</a>;
	       		 			var com = "Issuer: ";

							var content = 
								<span key={"transactionsum_block"+issuerkey}>
									<span key={"transactionsum_amount"+issuerkey} className="offersexercisedamount"> {self.state.selectedcurrency_total}  {FormatUtils.formatValue(issuer[self.state.selectedpaymenttype_total].amount)} </span>
									<span key={"transactionsum_number"+issuerkey} className="transactionnumber"> Number of payments: {issuer[self.state.selectedpaymenttype_total].count} </span>
									<span key={"transactionsum_issuer"+issuerkey} className="offersexercisedissuer"> {com} {Issuer}  </span>
								</span>;
							
							rows2.push(
								<tr key={"transactionsum_table"+issuerkey} className="offerexercisedrow"> 
									<td key={"transactionsum_table_line"+issuerkey} >  {content}  
									</td>
								</tr>
							);
						} else { emptyfield(); }
					} else if(self.state.selectedcurrency_total == "XRP"){
						
						if(currency_total[self.state.selectedpaymenttype_total]) {
							var content = 
								<span key={"transactionsum_block"+issuerkey} >
									<span key={"transactionsum_amount"+issuerkey} className="offersexercisedamount"> {self.state.selectedcurrency_total} {FormatUtils.formatValue(currency_total[self.state.selectedpaymenttype_total].amount)} </span>
									<span key={"transactionsum_number"+issuerkey} className="transactionnumber"> Number of payments: {currency_total[self.state.selectedpaymenttype_total].count} </span>
								</span>;

							rows2.push(
								<tr key={"transactionsumxrp_table"+issuerkey} className="offerexercisedrow"> 
									<td  key={"transactionsumxrp_table_line"+issuerkey}>  {content}  
									</td>
								</tr>
							);
						} else { emptyfield(); }
					}
				});
			}

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
						{ this.state.isloading ?  <div><img className="loading" src={'./img/loading2.gif'} /></div> : ''}
						{ !this.state.isloading ?
							this.state.rippletransactions[this.address].transactions.length > 0 ?
						    <Table bordered condensed hover  >
			                    <thead>
									<th colSpan={2}> 
										<span style={ofexsum_titlestyle}>Top 10 payments </span>
											<span>
												<select className="customSelector" style={doubleselectorstyle} onChange={this.onSelectPaymentType} value={this.state.selectedpaymenttype}>
													<option key={"optionsent"} value={"sent"}> SENT </option>
													<option key={"optionreceived"} value={"received"}> RECEIVED </option>
												</select>
												<select className="customSelector" onChange={this.onSelectCurrency} style={doubleselectorstyle} value={this.state.selectedcurrency}>
													{optioncurrencies}
												</select>
											</span>
									</th>											
			                    </thead>     
			                    <tbody>
			                       		{rows}  
			                    </tbody>
		              		</Table>
		              		: <div className="didntissueiou" > this account didnt made any payment </div>
		              	: "" }
				</div>
				<div className="panel-body" style={ofexsum_top10}>
					{ this.state.isloading ?  <div><img className="loading" src={'./img/loading2.gif'} /></div> : ''}
						{ !this.state.isloading ?
							this.state.rippletransactions[this.address].transactions.length > 0 ?
						    <Table bordered condensed hover  >
			                    <thead>
									<th colSpan={2}> 
										<span style={ofexsum_titlestyle}>Total payments </span>
											<span>
												<select className="customSelector" style={doubleselectorstyle} onChange={this.onSelectPaymentType_total} value={this.state.selectedpaymenttype_total}>
													<option key={"optionsent_total"} value={"sent"}> SENT </option>
													<option key={"optionreceived_total"} value={"received"}> RECEIVED </option>
												</select>
												<select className="customSelector" onChange={this.onSelectCurrency_total} style={doubleselectorstyle} value={this.state.selectedcurrency_total}>
													{optioncurrencies}
												</select>
											</span>
									</th>								
			                    </thead>     
			                    <tbody>
			                       	{rows2}  
			                    </tbody>
		              		</Table>
		              	: <div className="didntissueiou" > this account didnt made any payment </div> 
	              	: "" }
				</div>
			</div>
		);
	},

	_onChangeRippleaccounttransactionssummary: function() {
		var key = this.props.attributes.reportnumber;
		this.address= "address" + key;
		var data = getRippletransactionsState("address" + key);
		var defaultcurrency = Object.keys(data.rippletransactions[this.address].summary.top10)[0];
		var isloading = false;
		this.setState({ 
			rippletransactions: data.rippletransactions, 
			selectedcurrency:defaultcurrency, 
			selectedcurrency_total:defaultcurrency,
			selectedpaymenttype:"received",
			selectedpaymenttype_total:"received",
			isloading: isloading
		 });
	},

	_onLoading: function() {
		this.setState({
			isloading: true
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