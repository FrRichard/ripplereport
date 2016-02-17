var React = require('react');
var GridStore = require('GridStore');
var DashboardActions = require('DashboardActions');

var Tab= React.createClass({

	render: function() {
		var Searchbar = this.props.searchbar;
		return(
			<ul className="nav nav-pills nav-justified tab">
				<li role="balance" className="active" onClick={this._onChangeTab}> <a href='#'> Balance </a> </li>
				<li role="payments"  onClick={this._onChangeTab}> <a href="#"> Payments</a> </li>
				<li role="paymentsummary"  onClick={this._onChangeTab}> <a href="#"> Payment Summary </a> </li>
				<li role="trades"  onClick={this._onChangeTab}> <a href="#"> Trades </a> </li>
				<li role="ongoingoffers" onClick={this._onChangeTab}> <a href="#"> Ongoing Offers </a> </li>
				<li role="capitalization" onClick={this._onChangeTab}> <a href="#"> Capitalization </a> </li>
				<li role="searchbar"> <Searchbar/> </li>
			</ul>
		);
	},

	componentDidMount: function() {
		GridStore.addChangeListener('gridloaded', this._onChangeGrid);
		GridStore.addChangeListener('type', this._onChangeGrid);
	},

	_onChangeGrid: function() {
		var self = this;
		var tabtype =   GridStore.getSpecific('type').type;
		if(tabtype != 'all') {
			$('.grid-stack').height($('.grid-stack').height()-1180);
			_.each($('.grid-stack').children(), function(elem) {
				var datatype = $(elem).attr('datatype');
				if(!self.datatypeCheck(datatype, tabtype)) {
					$(elem).hide();
				} else {
					$(elem).show();
					$(elem).attr('data-gs-y',0);
				}
			});
		}

	},

	_onChangeTab: function(e) {
		$(e.currentTarget).toggleClass('active');
		$(e.currentTarget).siblings().removeClass('active');
		var type = $(e.currentTarget).attr('role');
		DashboardActions.settype(type);
	},

	updateTab: function() {

	},

	datatypeCheck: function(datatype, tabtype) {
		if(tabtype == "balance") {
			if(datatype == "AccountOverview" || datatype == "RippleAccount") {
				return true;
			}
		} else if(tabtype == "paymentsummary") {
			if(datatype == "RippleAccountTransactions" || datatype == "RippleAccountTransactionsSummary") {
				return true;
			}
		} else if(tabtype == "ongoingoffers") {
			if(datatype == "RippleAccountOffers" || datatype == "RippleAccountTransactionStats") {
				return true;
			}
		} else if(tabtype == "capitalization") {
			if(datatype == "RippleCapitalization" || datatype == "CapitalizationOverview") {
				return true;
			}
		} else if(tabtype == 'payments') {
			if(datatype == "Payments") {
				return true;
			}
		} else if (tabtype == 'trades') {
			if(datatype == "Exchanges") {
				return true;
			}
		}
		return false
	}


});


module.exports = Tab;