var React = require('react');
var RippleaccounttransactionsStore = require('RippleaccounttransactionsStore');
//charts
// var LineChart = require('barchart2');
var PieChart = require('pieChart_bignumber_react');
//css
var viewcommon = require('ViewCommon');
//helper
var datahelper = require('DataHelper');
var FormatUtils = require("FormatUtils");
var Griddle = require('griddle-react');

function getRippleaccounttransactionsState(key) {
	var rippleaccounttransactions= RippleaccounttransactionsStore.getSpecific(key);
	return {
		id: new Date().getTime(),
		rippleaccounttransactions:rippleaccounttransactions
	}
}

var RippleAccountTransactions = React.createClass({

	getInitialState: function() {
		rippleaccounttransactions={};
		return { rippleaccounttransactions:rippleaccounttransactions};
	},


	componentWillMount: function() {

	},

	componentDidMount: function() {
		var key = this.props.attributes.reportnumber;
		var address = "address" + key;
		//Listener
		RippleaccounttransactionsStore.addChangeListener(address, this._onChangeRippleaccounttransactions);
		// instanciate stuff
		this.DataHelper = new datahelper();
	},

	componentWillUnmount: function() {
		RippleaccounttransactionsStore.removeChangeListener(this._onChangeRippleaccounttransactions);
	},

	render: function() {
		var self =this;
		this.address= "address" + this.props.attributes.reportnumber;
		var panelstyle = viewcommon.linechart;

		this.chartId= "Overviewcapitalization" +this.props.attributes.key;
	    if( this.state.rippleaccounttransactions["address" + this.props.attributes.reportnumber] != undefined) {
	      // this.linechart.draw(this.chartId, this.state.rippleaccounttransactions["address" + this.props.attributes.reportnumber].transactions);
	    }
           // 			{ this.state.rippleaccounttransactions[this.address].summary.totalcash.length >0 ? 
			        //   <PieChart id={"CapitalizationOverviewChart"} size={[200,200]} data={this.state.shares} />
			        // : "" }
		var AllPies = [];
					// <Griddle results={fakeData} tableClassName="table" showFilter={true}
 // showSettings={true} columns={["name", "city", "state", "country"]}/>

		if(this.state.rippleaccounttransactions[this.address]) {
			var totalcashs = this.state.rippleaccounttransactions[this.address].summary.totalcash;
			_.each(totalcashs, function(totalcash,key) {
				var todraw = self.DataHelper.PieChart_bignumber(totalcash);
				var currencyimgsrc =FormatUtils.formatCurrencyLabel(key).image;
	      		var currencyimg = <img className="currencyimgoverview" src={currencyimgsrc}/> 
				if(todraw.length>0) {
					if(todraw[0].amount > 0 || todraw[1].amount > 0) {
						AllPies.push(
							<div className="transactionsmallpie">
								<div className="transactioncurrencytitle">
									{currencyimg} &nbsp;
									{key} 
								</div>
								<PieChart id={"Cashinout_"+key} size={[100,100]} data={todraw} />
								<div className="totalcashinoutt">
									<span className="totalcashin">Cash In: {FormatUtils.formatValue(totalcash.cashin)} </span><br/>
									<span className="totalcashout">Cash Out: {FormatUtils.formatValue(totalcash.cashout)} </span><br/>
									<span className="totalstandard">Standard: {FormatUtils.formatValue(totalcash.standard)} </span>
								</div>
							</div>
						);
					}
				}
			});
		}

		if(this.state.rippleaccounttransactions[this.address]) {
			var formatedtransactions =  this.DataHelper.transactionsGriddle(this.state.rippleaccounttransactions[this.address].transactions);
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
           		<h4 className="maintitleminipie"> Payment Sum and Directions </h4>
           		<h4 className="maintitlealltransactions "> All Payments </h4>
           		<div className="panel-body" style={panelstyle}>
           			<div className="allsmallpie">
           		 		{AllPies}
           		 	</div>
           		 	<div className="alltransactions">
	           		 	{ this.state.rippleaccounttransactions[this.address] ? 
	           		 		<Griddle results={this.state.rippleaccounttransactions[this.address].transactions}
	           		 			columns={["currency", "amount", "direction", "time"]} resultsPerPage={5}/>
	           		 	: "" }
           		 	</div>
				</div>

			</div>);

		this.address= "address" + this.props.attributes.reportnumber;
	},

	_onChangeRippleaccounttransactions: function() {
		var key = this.props.attributes.reportnumber;
		this.address= "address" + key;
		this.setState(getRippleaccounttransactionsState("address" + key));
	}

});

module.exports = RippleAccountTransactions;