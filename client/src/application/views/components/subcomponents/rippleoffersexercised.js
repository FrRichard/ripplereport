var React = require('react');
var RippleoffersexercisedStore = require('RippleoffersexercisedStore');
var linechart = require('linechart');
//afa
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
		var address = "address" + key;
		// this.linechart = new linechart(this.chartId);

		RippleoffersexercisedStore.addChangeListener(address, this._onChangeRippleOffersExercised);
		RippleoffersexercisedStore.addChangeListener('isloading', this._onLoading);
	},

	componentWillUnmount: function() {
		RippleoffersexercisedStore.removeChangeListener(this._onChangeRippleOffersExercised);
	},

	render: function() {
		var self =this;
		var panelstyle = { height:250+'px'};
		this.chartId= "OfferExercised" +this.props.attributes.key;
	

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

	_onChangeRippleOffersExercised: function() {
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