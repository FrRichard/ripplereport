var React = require('react');
//actions
var AccountActions = require('AccountActions');
//stores
var RippleaccountoverviewsStore = require('AccountOverviewsStore');
var GridStore = require('GridStore');
//charts
// var PieChart = require('PieChartD3');
var PieChart = require('PieChartReact');
//helpers
var FormatUtils = require("FormatUtils");
var gatewayNames = require('GatewayNames');
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
    var shares = false;
    var isloading = true;
    return { datasets:datasets, optlist:optlist, isloading:isloading, shares:shares };
	},

  componentWillMount: function() {
  },

  componentDidMount: function() {
    var address= "address" + this.props.attributes.reportnumber;

    this.dataHelper = new DataHelper();
    // Listener
    RippleaccountoverviewsStore.addChangeListener(address, this._onChangeRippleaccount);
    RippleaccountoverviewsStore.addChangeListener("isloading", this._onLoading);
  },

  componentWillUnmount: function() {
    RippleaccountoverviewsStore.removeChangeListener(this._onChangeRippleaccount);
  },

  render: function() {
    var self=this;
    var toresolve = "address" + this.props.attributes.reportnumber;
 
    if(this.state.optlist.currencylist) {
      var optionlist = _.map(this.state.optlist.currencylist, function(currency,i) { 
        if (currency.name == undefined) { currency.name =""; }
        if(currency.currency == self.state.optlist.selectedcurrency[0]) {
          return <option key={"optionaccountoverview"+i} value={[currency.currency, currency.issuer]} >{currency.currency+" "+currency.name}</option> 
        }
        return <option key={"optionaccountoverview"+i} value={[currency.currency, currency.issuer]}>{currency.currency+" "+currency.name}</option> 
      });

      var total = [];
      var currencyimgsrc =FormatUtils.formatCurrencyLabel(this.state.optlist.selectedcurrency[0]).image;
      var currencyimg = <img className="currencyimgoverview" src={currencyimgsrc}/> 
      total.push(<div key={"totalfiat"} className="totalfiat">{currencyimg} {FormatUtils.formatValue(this.state.totalfiat.amount)}</div> );
  
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
          { this.state.isloading ?  <div><img className="loading" src={'./img/loading2.gif'} /></div> : ''}

          {!this.state.isloading ?
            <div className="networthcontainer"> 
              <div className="totalvaluetitle">Net Worth in &nbsp;</div>
              { this.state.shares ?
                <select id="balanceoverviewselector" className='customSelector' onChange={this.onSelectCurrency} value={this.state.optlist.selectedcurrency[0]+","+this.state.optlist.selectedcurrency[1]} >
                  {optionlist}
                </select> 
              : ""}

              {this.state.shares ?
                <div id={"OverviewTotal" + this.props.attributes.key}> 
                  {total}
                </div>
              : ""}
            </div>
          :""}

          {this.state.shares ?
            <PieChart id={"BalanceOverviewChart"} size={[200,200]}  data={this.state.shares}/>
          : "" }
         
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
          },
          isloading:false
        });
  },

  _onLoading: function() {
    this.setState({
      isloading:true,
      shares:false
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