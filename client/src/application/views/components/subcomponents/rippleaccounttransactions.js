var React = require('react');
var RippleaccounttransactionsStore = require('RippleaccounttransactionsStore');
//charts
var LineChart = require('linechart');
//css
var viewcommon = require('ViewCommon');

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
		// instanciation & initialition du chart
		this.linechart = new LineChart(this.chartId);
		//Listener
		RippleaccounttransactionsStore.addChangeListener(address, this._onChangeRippleaccounttransactions);
	},

	componentWillUnmount: function() {
		RippleaccounttransactionsStore.removeChangeListener(this._onChangeRippleaccounttransactions);
	},

	render: function() {
		var self =this;
		this.address= "address" + this.props.attributes.reportnumber;
		console.log(this.state);
		var panelstyle = viewcommon.linechart;

		this.chartId= "Overviewcapitalization" +this.props.attributes.key;
	    if( this.state.rippleaccounttransactions["address" + this.props.attributes.reportnumber] != undefined) {
	      this.linechart.draw(this.chartId, this.state.rippleaccounttransactions["address" + this.props.attributes.reportnumber].transactions);
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
           		<div className="panel-body" style={panelstyle}>
           			<div id={this.chartId ? this.chartId: ''}></div>
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