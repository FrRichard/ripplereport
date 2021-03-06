var React = require('react/addons');
var gridster = require('gridster');
var gridstack = require('gridstack');
// var $ = require("jquery");
//         require("jquery-ui");

var config = require('Config');
var subcomponentselector = require('SubcomponentSelector');
var GridElements= require('GridElements');
var GridStore = require('GridStore');
var DashboardActions = require('DashboardActions');

function getDashboardState() {
    // on stock dans les props car on ne veut pas  rerender la vue. La vue doit être rerender uniquement 
    // lorsqu'on change de configuration global ( this.state.conf[original] ==> this.state.conf[perso])
    // var dashboard_conf=DashboardStore.getAll();
    // return {
    //   id:new Date().getTime(),
    //   dashboard_conf:dashboard_conf
    // }
}

var Dashboard = React.createClass({

  getInitialState: function() {
    // DashboarStore initial config_set (ie: classic, perso,)
    return null
  },

  componentDidMount: function() {
    //Listener
    GridStore.addChangeListener('change',this._onChangeGrid);
  
  },
  
  componentWillUnmount: function() {
    GridStore.removeChangeListener(this._onChangeGrid);
  },

  render: function() {
    var dashboard_config = this.props.dashboard_config.items;  
  
    var reportnumber = this.props.dashboard_config.reportnumber;
    var Items = subcomponentselector.selector(dashboard_config);

    var items = dashboard_config.map(function(item) {
      if(item.datatype) {
        var Element = Items[item.datatype];
        return (<Element attributes={item}></Element>);
      } else {
        var Element = Items['abstractsubcomponent'];
        return (<Element attributes={item}></Element>); 
      }
    });

    return (

      <div className="grid-stack"  ref="dashboardstate" >
        <GridElements items={items} reportnumber={reportnumber}/>
      </div>

    );

  },

  _onChangeGrid: function() {
  }
  
});



module.exports = Dashboard;