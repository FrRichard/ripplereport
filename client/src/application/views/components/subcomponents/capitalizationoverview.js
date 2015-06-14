var React = require('react');
//stores
var RippleexchangeratescapitalizationStore = require('RippleexchangeratescapitalizationStore');
var RipplecapitalizationoverviewStore = require('RipplecapitalizationoverviewStore');
var GridStore = require('GridStore');
//charts
var PieChart = require('pieChart_react');
//helpers
var FormatUtils = require("FormatUtils");
var gatewayNames = require('gatewayNames');
var DataHelper = require('DataHelper');
var adaptgrid = require('AdaptGrid');


function getRipplecapitalizationState(key) {
  var ripplecapitalization = RipplecapitalizationoverviewStore.getSpecific(key);
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
    var isloading = true;
    var shares = false;
    return { datasets:datasets, optlist:optlist, isloading:true, shares:shares };
	},

  componentWillMount: function() {
  },

  componentDidMount: function() {
    var address= "address" + this.props.attributes.reportnumber;
    // instanciation & initialition du chart
    this.piechart = new PieChart(this.chartId);
    this.dataHelper = new DataHelper();
    this.AdaptGrid = new adaptgrid();
    // Listener
    RipplecapitalizationoverviewStore.addChangeListener(address, this._onChangeCapitalizationOverview);
    RipplecapitalizationoverviewStore.addChangeListener("isloading", this._onLoading);
  },

  componentWillUnmount: function() {
    RipplecapitalizationoverviewStore.removeChangeListener(this._onChangeCapitalizationOverview);
  },

  render: function() {
    var self=this;
 
    if(this.state.optlist.currencylist) {
      var optionlist = _.map(this.state.optlist.currencylist, function(currency,i) { 
        if (currency.name == undefined) { currency.name =""; }
        if(currency.currency == self.state.optlist.selectedcurrency[0]) {
          return <option key={"optioncapitalizationoverview"+i} value={[currency.currency, currency.issuer]} >{currency.currency+" "+currency.name}</option> 
        }
        return <option key={"optioncapitalizationoverview"+i} value={[currency.currency, currency.issuer]}>{currency.currency+" "+currency.name}</option> 
     
      });

      var total = [];
      var currencyimgsrc =FormatUtils.formatCurrencyLabel(this.state.optlist.selectedcurrency[0]).image;
      var currencyimg = <img className="currencyimgoverview" src={currencyimgsrc}/> 
      total.push(<div key={"totalcapitalization"} className="totalfiat">{currencyimg} {FormatUtils.formatValue(this.state.totalfiat.amount)} </div>);
      // total.push(<div>Total value in &nbsp;</div>);
      // total.push(<div className="totalcurrencyimg">{this.state.optlist.selectedcurrency[0]}</div>);
      // total.push(<div className="gatewayname"> { this.state.totalfiat.name } </div>);
      // total.push(<div className="issuer"> { this.state.totalfiat.issuer } </div>);


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

        { !this.state.isloading ?
          this.state.shares ?
              <div className="networthcontainer"> 
                  <div className="totalvaluetitle">Net worth in &nbsp;</div>
                  <select className='customSelector' onChange={this.onSelectCurrency} value={this.state.optlist.selectedcurrency[0]+","+this.state.optlist.selectedcurrency[1]} >
                    {optionlist}
                  </select> 
                  <div id={"OverviewTotal" + this.props.attributes.key}> 
                      {total}
                  </div>
              </div>
          : <div className="didntissueiou"> This account didn't issue any IOU </div> 
        : "" }

       
        { this.state.shares ? 
          <PieChart id={"CapitalizationOverviewChart"} size={[200,200]} data={this.state.shares} />
        : "" }
          </div> 
      </div>
      );

  },

  _onChangeCapitalizationOverview: function() {
    var key = this.props.attributes.reportnumber;

    var address = RipplecapitalizationoverviewStore.getSpecific('address' + key);
    var defaultamountkey = Object.keys(address['address'+key]['totalfiat'])[0];

    if(address['address'+key].currencylist.length > 0) {
      var amount = address['address'+key]['totalfiat'][defaultamountkey].totalfiat;
      var issuer = address['address'+key]['totalfiat'][defaultamountkey].issuer;
      var shares = address['address'+key]['shares'];
      var datasets =  address['address'+key]['datasets'];
      amount = FormatUtils.truncToNdecimal(amount,2);
      
      this.setState({ 
          totalfiat:{
              amount:amount,
              issuer:issuer
          },
          shares:shares,
          datasets: datasets,
          optlist: {
              selectedcurrency:[defaultamountkey,issuer],
              currencylist: address['address'+key].currencylist
          },
          isloading:false
      });
    } 
    else {
      var shares = false;
      var isloading = false;
      var datasets = {}; 
      var optlist = {
        selectedcurrency:"",
        currencylist: false
      };
      this.setState({ datasets:datasets, optlist:optlist, shares:shares, isloading:false});
      // this._onEmptyCap("capitalizationoverview");
    }
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
  },

 _onEmptyCap: function(id) {
    
    this.AdaptGrid.reorganize(id);
  }


});


module.exports = CapitalizationOverview;