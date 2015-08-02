var React = require('react');
var PaymentGraphD3 = require('PaymentGraphD3');


var paymentGraph = React.createClass({

	componentDidMount: function() {
		var el = React.findDOMNode(this);
		this.PaymentGraphD3 = new PaymentGraphD3(el, this.getChartState().data, this.getChartState().id,this.getChartState().size);
		// console.log(this.getChartState().data, this.getChartState().id,this.getChartState().size);
	},

	componentDidUpdate: function() {
		console.log("react pymntgraph UPDATE D3!");
		var el = React.findDOMNode(this);
		this.PaymentGraphD3.update(el, this.getChartState().data, this.getChartState().id,this.getChartState().size); 
	},

	componentWillUnmount:  function() {
		// console.log("unmoouunnnnnnnnnnnnnnnnnnnnn");
		// var el = React.findDOMNode(this);
		// this.pieChartD3.remove(el);
	},

	getChartState: function() {
		return {
			data: this.props.data,
			id: this.props.id,
			size: this.props.size
		}
	},

	render: function() {
		// console.log(this.someshit(),this);
		// console.log(this);
		return (
			<div id={this.props.id} className="paymentgraph"></div>
		);
	}

});

module.exports = paymentGraph;