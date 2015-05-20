var React = require('react');
var RippleoffersexercisedStore = require('RippleoffersexercisedStore');
var BarChart = require('barChart2_react');
//css
var ViewCommon = require('ViewCommon');
//react-bootstrap
var Panel = require('react-bootstrap').Panel;

function getRippleoffersexercisedState(key) {
	var rippleoffersexersiced= RippleoffersexercisedStore.getSpecific(key);
	return {
		id: new Date().getTime(),
		rippleoffersexercised: rippleoffersexersiced
	}
}

var RippleOffersExercised = React.createClass({

	getInitialState: function() {
		var rippleoffersexercised = {};
		var isloading = true;
		return { rippleoffersexercised:rippleoffersexercised, isloading:true };
	},

	componentWillMount: function() {

	},

	componentDidMount: function() {
		var key = this.props.attributes.reportnumber;
		var address = "address" + key +"sum";
		// this.linechart = new linechart(this.chartId);

		RippleoffersexercisedStore.addChangeListener(address, this._onChangeRippleOffersExercised);
		RippleoffersexercisedStore.addChangeListener('isloading', this._onLoading);
	},

	componentWillUnmount: function() {
		RippleoffersexercisedStore.removeChangeListener(this._onChangeRippleOffersExercised);
	},

	render: function() {
		var self =this;
		var panelstyle = ViewCommon.linechart;
		this.chartId= "OfferExercised" +this.props.attributes.key;

		if(this.state.rippleoffersexercised[this.address]) {
			console.log("STAAAAAAAAAAAAAAAATE",this.state.rippleoffersexercised[this.address].globalorders.results.length);
			var chart = <BarChart id={this.chartId} size={[550,230]} data={this.state.rippleoffersexercised[this.address].globalorders.results} />
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
           			{chart}
				</div>
			</div>);

		this.address= "address" + this.props.attributes.reportnumber;
	},

	_onChangeRippleOffersExercised: function() {
		console.log("UPDAAAAAAAAAAAAAAAAAAAAAAAAAATE_DATA_VIEW!!!");
		var key = this.props.attributes.reportnumber;
		this.address= "address" + key;
		this.setState(getRippleoffersexercisedState("address" + key));
	},

	_onLoading: function() {
		this.setState({
			isloading:true
		});
	}

});

module.exports = RippleOffersExercised;