var React = require('react');
var pieChartD3 = require('PieChartBigNumberD3');


var pieChart = React.createClass({

	componentDidMount: function() {
		var el = React.findDOMNode(this);
		this.pieChartD3 = new pieChartD3(el, this.getChartState().data, this.getChartState().id,this.getChartState().size);
	},

	componentDidUpdate: function() {
		var el = React.findDOMNode(this);
		this.pieChartD3.update(el, this.getChartState().data, this.getChartState().id,this.getChartState().size); 
	},

	componentWillUnmount:  function() {
	},

	getChartState: function() {
		return {
			data: this.props.data,
			id: this.props.id,
			size: this.props.size
		}
	},

	render: function() {
		return (
			<div id={this.props.id} className="PieChart_bignumber"></div>
		);
	}

});

module.exports = pieChart;