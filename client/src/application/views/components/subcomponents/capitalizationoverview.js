var React = require('react');
//actions
var AccountActions = require('AccountActions');
var RippledataActions = require('RippledataActions');
//stores
var RipplecapitalizationStore = require('RipplecapitalizationStore');
var RippleexchangeratescapitalizationStore = require('RippleexchangeratescapitalizationStore');
var RipplecapitalizationoverviewStore = require('RipplecapitalizationoverviewStore');
var GridStore = require('GridStore');
//charts
var PieChart = require('pie_accountoverview');
//helpers
var FormatUtils = require("FormatUtils");
var gatewayNames = require('gatewayNames');
var DataHelper = require('DataHelper');


function getRipplecapitalizationState(key) {
  var ripplecapitalization= RipplecapitalizationStore.getSpecific(key);
  return {
    id: new Date().getTime(),
    ripplecapitalization:ripplecapitalization
  }
}

var CapitalizationOverview = React.createClass({

	getInitialState: function() {
    var datasets = {}; 
    var optlist = {
      selectedcurrency:"",
      currencylist: false
    };
    return { datasets:datasets, optlist:optlist };
	},

  componentWillMount: function() {
  },

  componentDidMount: function() {
    var address= "address" + this.props.attributes.reportnumber;
    // instanciation & initialition du chart
    this.piechart = new PieChart(this.chartId);
    // Listener
    RipplecapitalizationStore.addChangeListener(address, this._onChangeCapitalizationOverview);
  },

  componentWillUnmount: function() {
    RipplecapitalizationStore.removeChangeListener(this._onChangeCapitalizationOverview);
  },

  render: function() {
    var self=this;
    var toresolve = "address" + this.props.attributes.reportnumber;
    this.chartId= "CapitalizationOverview" +this.props.attributes.key;
    // console.log("capitalization staaaaaaaate",this.state);
    // if( this.state.datasets["address" + this.props.attributes.reportnumber] != undefined) {
    //   var datasets = this.state.datasets["address" + this.props.attributes.reportnumber];
        //   this.piechart.draw(this.chartId, datasets);
    // }
 
    
    return (
      <div className="panel panel-default">
        <div className="panel-heading clearfix">
          <div className="panel-title  pull-left" onMouseOver="" onMouseOut="">
            <i className={this.props.attributes.icon}></i>
            <span className="panel-title-text">{this.props.attributes.title}</span>
          </div>
        </div>
        <div className="panel-body">
          ablabalblalblal
       
        </div>
      </div>
      );

  },

  _onChangeCapitalizationOverview: function() {
      var key = this.props.attributes.reportnumber;

      // var datasets = RipplecapitalizationStore.getDatasets();
      // var address = RipplecapitalizationStore.getSpecific('address' + key);
    

      // var amount = address['address'+key]['totalfiat']['XRP'].totalfiat;
      // var issuer = address['address'+key]['totalfiat']['XRP'].issuer;
      // amount = FormatUtils.truncToNdecimal(amount,2);
      
      // this.setState(
      //   { totalfiat:{
      //         amount:amount,
      //         issuer:issuer
      //     },
      //     datasets: datasets,
      //     optlist: {
      //         selectedcurrency:["XRP",""],
      //         currencylist: address['address'+key].currencylist
      //     }
      //   });
      // this.setState({datasets:address});
  },

  onSelectCurrency: function(e) {

    // var currency = ($(e.target).val()).split(",");
    // var key = this.props.attributes.reportnumber;
    // var address = RippleaccountoverviewsStore.getSpecific('address' + key);
    // var amount = address['address'+key]['totalfiat'][currency[0]].totalfiat;
    // var issuer = address['address'+key]['totalfiat'][currency[0]].issuer;
    // this.setState(
    //   { totalfiat: { 
    //       amount:amount,
    //       issuer:issuer
    //     },
    //     optlist: {
    //         selectedcurrency:[currency[0],currency[1]],
    //         currencylist: address['address'+key].currencylist
    //     }
    //   });
    
  }


});


module.exports = CapitalizationOverview;