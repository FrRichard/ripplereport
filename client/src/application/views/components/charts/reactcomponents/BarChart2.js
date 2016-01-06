var React = require('react');
var barChartD3 = require('BarChart2D3');


var pieChart = React.createClass({

	componentDidMount: function() {
		var el = React.findDOMNode(this);
		this.barChartD3 = new barChartD3(el, this.getChartState().data, this.getChartState().id,this.getChartState().size);
	},

	componentDidUpdate: function() {
		var el = React.findDOMNode(this);
		this.barChartD3.update(el, this.getChartState().data, this.getChartState().id,this.getChartState().size); 
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
			<div id={this.props.id} className="BarChart"></div>
		);
	}

});

module.exports = pieChart;