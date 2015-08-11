var React = require('react');
var ChartEngine = require('ChartEngine');
var Topbar = require('Topbar');
var SideMenu = require('SideMenu');
var Footer = require('Footer');
var Dashboard = require('Dashboard');
var S = require('SearchbarAccount');
var GridStore = require('GridStore');
var RippleidStore = require('IdStore');
var AccountActions = require('AccountActions');


function getDashboardState() {
    var dashboard = GridStore.getConf('currentconf').conf;
    return {
        id: new Date().getTime(),
        dashboard:dashboard
    }

}

var Account = React.createClass({


    getInitialState: function() {
        var dashboard = GridStore.getConf('currentconf').conf;

        return { dashboard:dashboard };

    },

	componentDidMount: function() {
        // var idcollection = RippleidStore.getSpecific("address1")["address1"]["raw"];
        // AccountActions.viewready(idcollection);
        GridStore.addChangeListener(this._onChangeGrid);
	},
	
    render: function() {
            var Searchbar = this.props.searchbar;
            var isvalid = this.props.isvalid;
        return (<div>
            <Topbar searchbar={Searchbar}/>
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