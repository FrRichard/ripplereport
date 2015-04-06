var React = require('react');
//stores
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
  var ripplecapitalization= RipplecapitalizationoverviewStore.getSpecific(key);
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
    this.dataHelper = new DataHelper();
    // Listener
    RipplecapitalizationoverviewStore.addChangeListener(address, this._onChangeCapitalizationOverview);
  },

  componentWillUnmount: function() {
    RipplecapitalizationoverviewStore.removeChangeListener(this._onChangeCapitalizationOverview);
  },

  render: function() {
    var self=this;
    var toresolve = "address" + this.props.attributes.reportnumber;
    this.chartId= "Overviewcapitalization" +this.props.attributes.key;
       console.log("aaaaaaaaaaaaaaaaaaaaaaaa",this.state);
    if( this.state.datasets["address" + this.props.attributes.reportnumber] != undefined) {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaa",this.state);
      this.piechart.draw(this.chartId, this.state.shares);
    }
 
    if(this.state.optlist.currencylist) {
      var optionlist = _.map(this.state.optlist.currencylist, function(currency,i) { 
        if (currency.name == undefined) { currency.name =""; }
        if(currency.currency == self.state.optlist.selectedcurrency[0]) {
          return <option key={"optioncapitalizationoverview"+i} value={[currency.currency, currency.issuer]} >{currency.currency+" "+currency.name}</option> 
        }
        return <option key={"optioncapitalizationoverview"+i} value={[currency.currency, currency.issuer]}>{currency.currency+" "+currency.name}</option> 
      });
    } else {
      var optionlist = undefined;      
    }
    
 
    
    return (
      <div className="panel panel-default">
        <div className="panel-heading clearfix">
          <div className="panel-title  pull-left" onMouseOver="" onMouseOut="">
            <i className={this.props.attributes.icon}></i>
            <span className="panel-title-text">{this.props.attributes.title}</span>
          </div>
        </div>
        <div className="panel-body">
          <div id={this.chartId ? this.chartId: ''}></div>
          { this.state.optlist.currencylist ?
          <select className='fiatselector' onChange={this.onSelectCurrency} value={this.state.optlist.selectedcurrency[0]+","+this.state.optlist.selectedcurrency[1]} >
            {optionlist}
          </select> : "" }
          <div id={"OverviewTotal" + this.props.attributes.key}> 
            { this.state.optlist.currencylist ? <div>Total value in &nbsp;</div> : ""}
            { this.state.optlist.currencylist ? <div className="totalfiat"> { this.state.totalfiat.amount } </div> : ""}
            { this.state.optlist.currencylist ? <div className="gatewayname"> { this.state.totalfiat.name } </div> : "" }
            { this.state.optlist.currencylist ? <div className="issuer"> { this.state.totalfiat.issuer } </div> : "" }
          </div>
        </div>
      </div>
      );

  },

  _onChangeCapitalizationOverview: function() {
    var key = this.props.attributes.reportnumber;

    var address = RipplecapitalizationoverviewStore.getSpecific('address' + key);
    var defaultamountkey = Object.keys(address['address'+key]['totalfiat'])[0];

    var amount = address['address'+key]['totalfiat'][defaultamountkey].totalfiat;
    var issuer = address['address'+key]['totalfiat'][defaultamountkey].issuer;
    var shares = address['address'+key]['shares'];
    var datasets =  address['address'+key]['datasets'];
    amount = FormatUtils.truncToNdecimal(amount,2);
    
    this.setState(
      { totalfiat:{
            amount:amount,
            issuer:issuer
        },
        shares:shares,
        datasets: datasets,
        optlist: {
            selectedcurrency:["XRP",""],
            currencylist: address['address'+key].currencylist
        }
      });
  },

  onSelectCurrency: function(e) {

    var currency = ($(e.target).val()).split(",");
    var key = this.props.attributes.reportnumber;
    var address = RipplecapitalizationoverviewStore.getSpecific('address' + key);
    var amount = address['address'+key]['totalfiat'][currency[0]].totalfiat;
    var issuer = address['address'+key]['totalfiat'][currency[0]].issuer;
    this.setState(
      { totalfiat: { 
          amount:amount,
          issuer:issuer
        },
        optlist: {
            selectedcurrency:[currency[0],currency[1]],
            currencylist: address['address'+key].currencylist
        }
      });
  }


});


module.exports = CapitalizationOverview;