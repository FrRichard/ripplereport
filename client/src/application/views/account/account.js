var React = require('react');
var ChartEngine = require('ChartEngine');
var Topbar = require('Topbar');
var SideMenu = require('SideMenu');
var Footer = require('Footer');
var Dashboard = require('Dashboard');
var Searchbar = require('Searchbar_account');
var GridStore = require('GridStore');


function getDashboardState() {
    var dashboard = GridStore.getConf('currentconf').conf;
    return {
        id: new Date().getTime(),
        dashboard:dashboard
    }

}

var Account = React.createClass({


    getInitialState: function() {
        var dashboard = {};

        return { dashboard:dashboard };

    },

	componentDidMount: function() {
		GridStore.addChangeListener(this._onChangeGrid);
	},
	
    render: function() {
        return (
        <div>
            <Topbar searchbar={Searchbar} />
        { this.state.dashboard.items ?
            <Dashboard dashboard_config={ this.state.dashboard } />
        : ''}
        </div>
        );
    },

    _onChangeGrid: function() {
        this.setState(getDashboardState());
    }
});

module.exports = Account;