var React = require('react');
var RippleoffersexercisedStore = require('RippleoffersexercisedStore');
var gatewayNames = require('gatewayNames');
var moment = require('moment');
// React bootstrap
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Accordion = require('react-bootstrap').Accordion;
// css
var viewcommon =require('ViewCommon');
//common
var CollapsableRow = require('CollapsableRow');
//utils
var FormatUtils = require("FormatUtils");
//charts
var barcharttotal = require('offersexercisedtotal');


function getRippleoffersexercisedsummaryState(key) {
	var rippleoffersexersicedsummary= RippleoffersexercisedStore.getSpecific(key);
	return {
		id: new Date().getTime(),
		rippleoffersexercisedsummary: rippleoffersexersicedsummary
	}
}



var RippleOffersExercisedSummary = React.createClass({

	getInitialState: function() {
		var rippleoffersexercisedsummary = {};
		var selectedtypeoffer = "counter";
		var selectedcurrency = null;
		var selectedtypeoffer_total = "counter";
		var isloading = true;

		return { rippleoffersexercisedsummary:rippleoffersexercisedsummary, 
				 selectedtypeoffer:selectedtypeoffer,
				 selectedcurrency:selectedcurrency,
				 selectedtypeoffer_total:selectedtypeoffer_total,
				 isloading:isloading
				};
	},


	componentWillMount: function() {
		var key = this.props.attributes.reportnumber;
		this.address= "address" + key;
	},

	componentDidMount: function() {
		var key = this.props.attributes.reportnumber;
		var address = "address" + key;
		RippleoffersexercisedStore.addChangeListener(address, this._onChangeRippleOffersExercisedSummary);
		RippleoffersexercisedStore.addChangeListener("isloading", this._onLoading);
	},

	componentWillUnmount: function() {
		RippleoffersexercisedStore.removeChangeListener(this._onChangeRippleOffersExercisedSummary);
	},

	render: function() {
		var self =this;
		var panelstyle = viewcommon.panellist_small;
		var doubleselectorstyle = viewcommon.doubleselector;
		var ofexsum_titlestyle = viewcommon.ofexsum_title;
		var ofexsum_top10 = viewcommon.ofexsum_top10;
		var ofexsum_total = viewcommon.ofexsum_total;
		var rows = [];
		var rows_total = [];
	     // var name = _.filter(gatewayNames,function(gateway) {
      //   return gateway.address == share.issuer;
   		 // });
	
		if(this.state.rippleoffersexercisedsummary[this.address] ) {
			var summarybase =Object.keys(this.state.rippleoffersexercisedsummary[this.address].summary.currencies["base"]);
			var summarycounter =Object.keys(this.state.rippleoffersexercisedsummary[this.address].summary.currencies["counter"]);
			var currencylist = _.uniq(summarybase.concat(summarycounter));
			
       		var optioncurrencies = _.map(currencylist ,function(currency) {
				return <option key={"optionofferexercised"+currency} value={currency}>{currency}</option> 
			});

			var top10 = this.state.rippleoffersexercisedsummary[this.address].summary.top10[this.state.selectedtypeoffer][this.state.selectedcurrency];

       		_.each(top10, function(offer,i) {
       		 	offer.date = moment(offer.time).format('MMMM Do YYYY, h:mm:ss a');
       		 	if(offer[self.state.selectedtypeoffer].currency == "XRP") {
       		 		var issuer = "";
       		 		var com="";
       		 	} else {
       		 		var address = { address:offer[self.state.selectedtypeoffer].issuer};
       		 		var com = "Issuer: ";
       		 		var issuer = <a href={"/app?"+JSON.stringify(address)} target="_blank" value={offer[self.state.selectedtypeoffer].issuer}> {offer[self.state.selectedtypeoffer].issuer}</a>;
       		 	}

       		 	var content = 
       		 		<span > 
       		 			<span className="offersexercisedamount">{offer[self.state.selectedtypeoffer].currency} &nbsp;{FormatUtils.formatValue(offer[self.state.selectedtypeoffer].amount)}</span> 
       		 			<span className="offersexerciseddate">{offer.date}</span>  
       		 			<span className="offersexercisedissuer"> {com} {issuer} </span>
       		 		</span>;

       		 	if(self.state.selectedtypeoffer == "counter") {
       		 		if(offer["base"].currency == "XRP") {
       		 			var issuer = "";
       		 			var com = "";
       		 		} else {
       		 			var address = { address:offer["base"].issuer};
       		 			var issuer = <a href={"/app?"+JSON.stringify(address)} target="_blank" value={offer["base"].issuer}> {offer["base"].issuer}</a>;
       		 			var com = "Issuer: ";
       		 		}
       		 		var hiddencontent = 
       		 			<span>
       		 				<span className="offerexercisedhaspaid"> Has paid: { FormatUtils.formatValue(offer["base"].amount) } { offer["base"].currency }   </span>
       		 				<span className="offersexercisedissuer"> {com} { issuer } </span>
       		 				<span className="offersexercisedtxhash"> {offer.txHash}</span>
       		 			</span>
       		 	} else {
       		 		if(offer["counter"].currency == "XRP") {
       		 			var issuer = "";
       		 			var com = "";
       		 		} else {
       		 			var address = { address:offer["counter"].issuer};
       		 			var issuer = <a href={"/app?"+JSON.stringify(address)} target="_blank" value={offer["counter"].issuer}> {offer["counter"].issuer}</a>;
       		 			var com = "Issuer: ";
       		 		}
       		 		var hiddencontent = 
       		 			<span>
       		 				<span className="offerexercisedgotpaid"> Got paid: { FormatUtils.formatValue(offer["counter"].amount) } { offer["counter"].currency } </span>
       		 				<span className="offersexercisedissuer_gotpaid"> {com} {issuer} </span>
       		 			</span>;

       		 	}
				rows.push(   
					<tr className="offerexercisedrow"> 
							<td>  <CollapsableRow key={"offerexercised_"+offer[self.state.selectedtypeoffer].issuer+i} content={content} offertype={self.state.selectedtypeoffer}> {hiddencontent} </CollapsableRow>
						</td>
					</tr>);
	        }); 

       		var total = this.state.rippleoffersexercisedsummary[this.address].summary.total[this.state.selectedtypeoffer_total];
       		
       		_.each(total, function(issuers,currency) {
       			_.map(issuers, function(d,issuer,i) {
       				if(currency == "XRP") {
	       				var content = 
	       					<span>
	       						<span className="offersexercisedamount"> {currency} {FormatUtils.formatValue(d.amount)}  </span>
	       					</span>;
	       				var hiddencontent =
	       					<span>
	       						<div className="offersexercisednumberorders"> Number of orders: {FormatUtils.formatValue(d.ordernumber)} </div> <br/>
	       						<span className="offersexercisedaverageamount"> Average amount: {FormatUtils.formatValue(d.averageamount)} </span>
	       					</span>;
       		 		} else {
       		 			var address = { address:issuer};
       		 			var issuer = <a href={"/app?"+JSON.stringify(address)} target="_blank" value={issuer}> {issuer}</a>;
       		 			var com = "Issuer: ";
       		 			var content = 
	       					<span>
	       						<span className="offersexercisedamount"> {currency} {FormatUtils.formatValue(d.amount)}  </span><br/>
	       						<span className="offersexercisedissuer"> {com}{issuer} </span>
	       					</span>;
	       				var hiddencontent =
	       					<span>
	       						<br/>
	       						<div className="offersexercisednumberorders"> Number of orders: {FormatUtils.formatValue(d.ordernumber)} </div> <br/>
	       						<span className="offersexercisedaverageamount"> Average amount: {FormatUtils.formatValue(d.averageamount)} </span>
	       					</span>;
       		 		}
      
       				rows_total.push(
       					<tr className="offerexercisedrow"> 
							<td>  <CollapsableRow key={"offerexercised_total_"+issuer+i} content={content} offertype={self.state.selectedtypeoffer}> {hiddencontent} </CollapsableRow>
						</td>
					</tr>);
       			});	
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
           			{ this.state.isloading ?  <div><img className="loading" src={'./img/loading2.gif'} /></div> : ''}
						{ !this.state.isloading ?
								this.state.rippleoffersexercisedsummary[this.address]?
									this.state.rippleoffersexercisedsummary[this.address].results.length > 0 ?
									    <Table striped bordered condensed hover className="offerexercisedtop10table" >
						                    <thead>
												<th colSpan={2}> 
													<span style={ofexsum_titlestyle}>Top 10 trades </span>
														<span>
															<select className="customSelector" style={doubleselectorstyle} onChange={this.onSelectTypeOffer} value={this.state.selectedtypeoffer}>
																<option key={"optionbase"} value={"base"}> SOLD </option>
																<option key={"optioncounter"} value={"counter"}> BOUGHT </option>
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
				              		:  <div className="didntissueiou"> This account didnt exercised any offer </div>
				              	:  <div className="didntissueiou"> This account didnt exercised any offer </div>
						: "" }
				</div>
				<div className="panel-body" style={ofexsum_top10}>
					{ !this.state.isloading ?
							this.state.rippleoffersexercisedsummary[this.address]?
								this.state.rippleoffersexercisedsummary[this.address].results.length > 0 ?
								    <Table striped bordered condensed hover id="offerexercisedtotaltable" >
					                    <thead>
											<th colSpan={2}> 
												<span style={ofexsum_titlestyle}>Total traded </span>
													<span>
													<select className="customSelector" style={doubleselectorstyle} onChange={this.onSelectTypeOffer_total} value={this.state.selectedtypeoffer_total}>
														<option key={"optionbase_total"} value={"base"}> SOLD </option>
														<option key={"optioncounter_total"} value={"counter"}> BOUGHT </option>
													</select>
													</span>
											</th>							
									
					                    </thead>  
						                    <tbody>
						                    	{rows_total}    
						                    </tbody>
				              		</Table>
			              		: ""
			              	: ""
					: "" }
				</div>
			</div>);

		this.address= "address" + this.props.attributes.reportnumber;
	},

	onSelectTypeOffer: function(e) {
		var typeoffer = $(e.target).val();
		this.setState( { selectedtypeoffer:typeoffer } );
	},

	onSelectCurrency: function(e) {
		var currency = $(e.target).val();
		this.setState( { selectedcurrency:currency });
	},

	onSelectTypeOffer_total: function(e) {
		var typeoffer = $(e.target).val();
		this.setState( { selectedtypeoffer_total:typeoffer } );
	},

	_onChangeRippleOffersExercisedSummary: function() {
		var data = getRippleoffersexercisedsummaryState(this.address);
		if(data.rippleoffersexercisedsummary[this.address].results.length != 0 ) {
			var defaultcurrency = Object.keys(data.rippleoffersexercisedsummary[this.address].summary.top10[this.state.selectedtypeoffer])[0];
			var isloading = false;
			var isempty = false;
			this.setState({ 
				rippleoffersexercisedsummary: data.rippleoffersexercisedsummary, 
				selectedcurrency: defaultcurrency,
				isloading: isloading,
				isempty: isempty
			});
		} else {
			var isloading = false;
			var isempty = true;
			this.setState({
				isloading: isloading,
				isempty: isempty
			})
		}

	},

	_onLoading: function() {
		this.setState({
			isloading:true
		});
	}

});

module.exports = RippleOffersExercisedSummary;