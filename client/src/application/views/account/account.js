var React = require('react');
var ChartEngine = require('ChartEngine');
var Topbar = require('Topbar');
var SideMenu = require('SideMenu');
var Footer = require('Footer');
var Dashboard = require('Dashboard');
var Searchbar = require('Searchbar_account');



var Account = React.createClass({
	componentDidMount: function() {
		
	},
	
    render: function() {

        return (
        <div>
            <Topbar searchbar={Searchbar} />
            <Dashboard dashboard_config={ this.props.dashboard_config } />
        </div>);
    }
});

module.exports = Account;