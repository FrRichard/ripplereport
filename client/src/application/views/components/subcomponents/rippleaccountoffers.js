var React = require('react');
var RippleaccountoffersStore = require('RippleaccountoffersStore');
//react-bootstrap
var Table = require('react-bootstrap').Table;
var Panel = require('react-bootstrap').Panel;
//helper&format
var DataHelper = require('DataHelper');
//styles
var SvgCommon = require('SvgCommon');
var ViewCommon = require("ViewCommon");

function getRippleaccountoffersState(key) {
	var rippleaccountoffers= RippleaccountoffersStore.getSpecific(key);
	return {
		id: new Date().getTime(),
		rippleaccountoffers: rippleaccountoffers
	}
}

var RippleAccountOffers = React.createClass({

	getInitialState: function() {
		var rippleaccountoffers = {};
		var isloading = true;
		return {
			rippleaccountoffers:rippleaccountoffers,
			isloading:isloading
		};
	},


	componentWillMount: function() {
		this.datahelper = new DataHelper();
	},

	componentDidMount: function() {
		var key = this.props.attributes.reportnumber;
		var address = "address" + key;
		RippleaccountoffersStore.addChangeListener("isloading", this._onLoading);
		RippleaccountoffersStore.addChangeListener(address, this._onChangeRippleAccountOffers);
	},

	componentWillUnmount: function() {
		RippleaccountoffersStore.removeChangeListener(this._onChangeRippleAccountOffers);
	},

  
	render: function() {
		var self =this;
		var panelstyle = ViewCommon.panellist;
		var rows = [];

		if(this.state.rippleaccountoffers["address" + this.props.attributes.reportnumber] != undefined) {
			this.data = this.datahelper.accountoffers(this.state.rippleaccountoffers["address" + this.props.attributes.reportnumber]);
			_.each(this.data, function(d,i) {
				rows.push(
					<tr key={"accountofferresult"+i} >
						<td key={"accountoffertype"+i} className={d.order}> { d.order } </td>
						<td key={"accountoffercurrency"+i}> <span>{ d.taker_gets.value }</span> <span> { d.taker_gets.currency } </span> </td>
						<td key={"accountoffervalue"+i}> <span> { d.taker_pays.value } </span> <span> { d.taker_pays.currency } </span> </td>
						<td key={"accountofferrate"+i}> { d.rate } </td>
					</tr>
				)
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
           		<div className="panel-body" style={panelstyle}>
           			{ this.state.isloading ?  <div><img className="loading" src={'./img/loading2.gif'} /></div> : ''}
	          		{ !this.state.isloading ?
		          		<Table striped bordered condensed hover>
			   			    <thead>
			                  <th> Offers </th>
			                  <th> Base</th>
			                  <th> Counter </th>
			                  <th> Rate </th>
			                </thead>     
		                    <tbody>
		                      {rows}    
		                    </tbody>
		                </Table>
	                : "" }
           		</div>
			</div>);

		this.address= "address" + this.props.attributes.reportnumber;
	},

	_onChangeRippleAccountOffers: function() {

		var key = this.props.attributes.reportnumber;
		this.address = "address" + key;
		var rippleaccountoffers = getRippleaccountoffersState("address" + key).rippleaccountoffers;
		var isloading = false;
		this.setState({
			rippleaccountoffers: rippleaccountoffers,
			isloading: isloading
		});
	},

	_onLoading: function() {
		this.setState({
			isloading : true
		});
	}

});

module.exports = RippleAccountOffers;