var React = require('react');
//actions
var AccountActions = require('AccountActions');
//stores
var RippleaccountoverviewsStore = require('RippleaccountoverviewsStore');
var GridStore = require('GridStore');
//charts
var PieChart = require('pie_accountoverview');
//helpers
var FormatUtils = require("FormatUtils");
var gatewayNames = require('gatewayNames');
var DataHelper = require('DataHelper');


function getRippleAccountState(key) {
  var rippleaccount = RippleaccountoverviewsStore.getSpecific(key);

  return {
    id: new Date().getTime(),
    rippleaccount:rippleaccount
  }

}

var AccountOverview = React.createClass({

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
    RippleaccountoverviewsStore.addChangeListener(address, this._onChangeRippleaccount);
  },

  componentWillUnmount: function() {
    RippleaccountoverviewsStore.removeChangeListener(this._onChangeRippleaccount);
  },

  render: function() {
    var self=this;
    var toresolve = "address" + this.props.attributes.reportnumber;
    this.chartId= "Overview" +this.props.attributes.key;

    if( this.state.datasets["address" + this.props.attributes.reportnumber] != undefined) {
      this.piechart.draw(this.chartId, this.state.shares);
    }
 
    if(this.state.optlist.currencylist) {
      var optionlist = _.map(this.state.optlist.currencylist, function(currency,i) { 
        if (currency.name == undefined) { currency.name =""; }
        if(currency.currency == self.state.optlist.selectedcurrency[0]) {
          return <option key={"optionaccountoverview"+i} value={[currency.currency, currency.issuer]} >{currency.currency+" "+currency.name}</option> 
        }
        return <option key={"optionaccountoverview"+i} value={[currency.currency, currency.issuer]}>{currency.currency+" "+currency.name}</option> 
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

  _onChangeRippleaccount: function() {
      var key = this.props.attributes.reportnumber;

      var address = RippleaccountoverviewsStore.getSpecific('address' + key);
      var amount = address['address'+key]['totalfiat']['XRP'].totalfiat;
      var issuer = address['address'+key]['totalfiat']['XRP'].issuer;
      var shares = address['address'+key]['shares'];
      var datasets =  address['address'+key]['datasets'];
      amount = FormatUtils.truncToNdecimal(amount,2);
      
      this.setState(
        { totalfiat:{
              amount:amount,
              issuer:issuer
          },
          datasets: datasets,
          shares:shares,
          optlist: {
              selectedcurrency:["XRP",""],
              currencylist: address['address'+key].currencylist
          }
        });
  },

  onSelectCurrency: function(e) {

    var currency = ($(e.target).val()).split(",");
    var key = this.props.attributes.reportnumber;
    var address = RippleaccountoverviewsStore.getSpecific('address' + key);
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


module.exports = AccountOverview;