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
       		var optioncurrencies = _.map(this.state.rippleoffersexercisedsummary[this.address].summary.currencies[this.state.selectedtypeoffer] ,function(issuers,currency) {
				return <option key={"optionofferexercised"+currency} value={currency}>{currency}</option> 
			});

			var top10 = this.state.rippleoffersexercisedsummary[this.address].summary.top10[this.state.selectedtypeoffer][this.state.selectedcurrency];

       		 _.each(top10, function(offer,i) {
       		 	var content = <span > {offer[self.state.selectedtypeoffer].amount} issuer:{offer[self.state.selectedtypeoffer].issuer} {offer.time} </span>;

       		 	if(self.state.selectedtypeoffer == "counter") {
       		 		var hiddencontent = <span> Has paid: { offer["base"].amount } { offer["base"].currency } issuer: { offer["base"].issuer } </span>;
       		 	} else {
       		 		var hiddencontent = <span> Got paid: { offer["counter"].amount } { offer["counter"].currency } issuer: { offer["counter"].issuer } </span>;       
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
       				var content = <span> {currency}:{d.amount} issuer:{issuer} </span>;
       				var hiddencontent = <span>Number of orders:{d.ordernumber} Average amount:{d.averageamount} </span>;
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
				    <Table striped bordered condensed hover  >
	                    <thead>
							<th colSpan={2}> 
								<span style={ofexsum_titlestyle}>Top 10 trades </span>
								{ !this.state.isloading ?
									<span>
										<select className="customSelector" style={doubleselectorstyle} onChange={this.onSelectTypeOffer} value={this.state.selectedtypeoffer}>
											<option key={"optionbase"} value={"base"}> SOLD </option>
											<option key={"optioncounter"} value={"counter"}> BOUGHT </option>
										</select>
										<select className="customSelector" onChange={this.onSelectCurrency} style={doubleselectorstyle} value={this.state.selectedcurrency}>
											{optioncurrencies}
										</select>
									</span>
								: "" }
							</th>							
					
	                    </thead> 
		                    <tbody>
	                    		{ !this.state.isloading ?    
		                      		{rows}    
	                    		:"" }
		                    </tbody>
              		</Table>
				</div>
				<div className="panel-body" style={ofexsum_top10}>
					{ this.state.isloading ?  <div><img className="loading" src={'./img/loading2.gif'} /></div> : ''}
				    <Table striped bordered condensed hover  >
	                    <thead>
							<th colSpan={2}> 
								<span style={ofexsum_titlestyle}>Total traded </span>
								{ !this.state.isloading ?
									<span>
									<select className="customSelector" style={doubleselectorstyle} onChange={this.onSelectTypeOffer_total} value={this.state.selectedtypeoffer_total}>
										<option key={"optionbase_total"} value={"base"}> SOLD </option>
										<option key={"optioncounter_total"} value={"counter"}> BOUGHT </option>
									</select>
									</span>
								: "" }
							</th>							
					
	                    </thead>  
		                    <tbody>
	                    		{ !this.state.isloading ?    
		                    	  	{rows_total}    
	                    		: "" }
		                    </tbody>
              		</Table>
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
		var defaultcurrency = Object.keys(data.rippleoffersexercisedsummary[this.address].summary.top10[this.state.selectedtypeoffer])[0];
		var isloading = false;

		this.setState({ 
			rippleoffersexercisedsummary: data.rippleoffersexercisedsummary, 
			selectedcurrency: defaultcurrency,
			isloading: isloading
		});
	},

	_onLoading: function() {
		this.setState({
			isloading:true
		});
	}

});

module.exports = RippleOffersExercisedSummary;