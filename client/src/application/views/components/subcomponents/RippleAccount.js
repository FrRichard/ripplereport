var React = require('react');
var ChartEngine = require('ChartEngine');
var RippleidStore = require('IdStore');
var RipplelinesStore = require('LinesStore');
var RippleinfosStore = require('InfosStore');
var GridStore = require('GridStore');

var d3 = require("d3");
//Utils
var FormatUtils = require("FormatUtils");
var gatewayNames = require('GatewayNames');
//css
var viewcommon = require('ViewCommon');
// React-bootstrap
// var Accordion = require('react-bootstrap').Accordion;
// var PanelGroup = require('react-bootstrap').PanelGroup;
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;
//common
var CollapsableRow = require('CollapsableRow');

var AccountActions = require('AccountActions');


function isLoading(key) {

  var loadstate=RippleidStore.isLoading(key);
  return {
    rippleids:loadstate
  }
}

function getRippleidState(key) {

    var rippleid=RippleidStore.getSpecific(key);
    return {
      id:new Date().getTime(),
      rippleids:rippleid
    }
}

function getRipplelinesState(key) {

    var ripplelines=RipplelinesStore.getSpecific(key);
    return {
      id:new Date().getTime(),
      ripplelines:ripplelines
    }
}

function getRippleinfosState(key) {
    var rippleinfos=RippleinfosStore.getSpecific(key);
    return {
      id:new Date().getTime(),
      rippleinfos:rippleinfos
    }
}

var RippleAccount = React.createClass({
    getInitialState: function() {
      var key =  this.props.attributes.reportnumber;

      rippleids=getRippleidState("address"+key)["rippleids"];
      rippleinfos=getRippleinfosState("address"+key)["rippleinfos"];
      ripplelines=getRipplelinesState("address"+key)["ripplelines"];
      isloading=true;
      return { rippleids:rippleids, rippleinfos:rippleinfos, ripplelines:ripplelines, isloading:isloading };
 
    },

    componentWillMount: function() {

    },
    
    componentDidMount: function() {
      var key =  this.props.attributes.reportnumber;
      var address = "address"+key;
      //Listener --> Loading
      RippleidStore.addChangeListener("isloading", this._onLoading);
      // Listener --> Store loaded
      RippleidStore.addChangeListener(address,this._onChangeRippleid);
      RipplelinesStore.addChangeListener(address,this._onChangeRipplelines);
      RippleinfosStore.addChangeListener(address,this._onChangeRippleinfos);
    },
    
    componentWillUnmount: function() {
      RippleidStore.removeChangeListener(this._onChangeRippleid);
      RipplelinesStore.removeChangeListener(this._onChangeRipplelines);
      RippleinfosStore.removeChangeListener(this._onChangeRippleinfos);
    },

    render: function() {
      var self=this;
      this.address= "address" + this.props.attributes.reportnumber;
      var panelstyle = viewcommon.panellist;
      var linestyle = { 'margin-bottom': 5 +'px'};
      var rows = [];

      // pushing xrp balance
      if(this.state.rippleinfos[this.address]) {
        var xrpamount =this.state.rippleinfos[this.address].account_data.Balance/Math.pow(10,6);
        rows.push(
          <tr onMouseOver={self.mouseOverLinesHandler(['XRP',""])} key={"rippleacount"+rows.length} onMouseOut={self.mouseOutLinesHandler(['XRP',""])}>
              <td key={"rippleaccouncurrencyxrp"+(rows.length)}>XRP</td>
              <td key={"rippleaccountbalancexrp"+(rows.length)}> {FormatUtils.formatValue(xrpamount)} </td>
          </tr>
        );
      }
      // pushing lines balances
      if(this.state.ripplelines[this.address] ) {
        _.each(this.state.ripplelines[this.address].lines, function(line,i) {
          if(line['balance'] > 0) {
            if(line['no_ripple'] == true) { var noripple = <i className="fa fa-times checkwrong"></i>; } else { var noripple = <i className="fa fa-check checkright"></i>; }
            var address = { address:line['account']};
            rows.push(     
              <tr key={"accounttable"+(i+1)} onMouseOver={self.mouseOverLinesHandler([line['currency'],line['account']])}    onMouseOut={self.mouseOutLinesHandler([line['currency'],line['account']])}>              
                  <td key={"rippleaccouncurrency"+(i+1)}> {line['currency']}</td>
                  <td key={"rippleaccountbalance"+(i+1)}> {FormatUtils.formatValue(line['balance'])} </td>
                  <td key={"rippleaccountaccount"+(i+1)}> <a href={"/app?"+JSON.stringify(address)} target="_blank" value={line['account']}> {line['account']} </a> </td>
                  <td key={"rippleaccountname"+(i+1)}> {line['name']} </td>
                  <td className="check" key={"rippleaccountno_ripple"+(i+1)}> {noripple} </td>
              </tr>
            );
          }
        }); 
      }

      return (
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <div className="panel-title  pull-left" onMouseOver="" onMouseOut="">
              <i className={this.props.attributes.icon}></i>
              <span>
                <span className="panel-title-text">
                  {this.props.attributes.title} &nbsp;
                </span>
                <span className="title-address">
                  {this.state.rippleids[this.address] && this.state.rippleids[this.address].username!=undefined ? "~"+this.state.rippleids[this.address].username : ""}         
                </span>
                <span className="title-name">
                  {this.state.rippleids[this.address] && this.state.rippleids[this.address].address!=undefined  ? this.state.rippleids[this.address].address : ""} &nbsp; 
                </span>
              </span>
            </div>
          </div>
          <div className="panel-body" style={panelstyle}>
              { this.state.isloading ?  <div><img className="loading" src={'./img/loading2.gif'} /></div> : ''}
              { !this.state.isloading ?
              <Table striped bordered condensed hover>
                    <thead>
                      <th> Currency </th>
                      <th> Amount </th>
                      <th> Issuer </th>
                      <th> Name </th>
                      <th> Rippling </th>
                    </thead>     
                    <tbody>
                      {rows}    
                    </tbody>
              </Table>
              : "" }

          </div>
        </div>
        ); 
    },

   _onLoading: function() {
      this.setState({
        isloading:true
      });
    },

    _onChangeRippleid: function() {
      var key = this.props.attributes.reportnumber;
      if(_.isObject(getRippleidState("address"+key).rippleids["address"+key].address)) {
        var id = getRippleidState("address"+key);
        id.rippleids["address"+key].address = id.rippleids["address"+key].address.address;
        this.setState(id);
      } else {
        this.setState(getRippleidState("address"+key));
      }

    },
    _onChangeRipplelines: function() {
      var key = this.props.attributes.reportnumber;
      var getlines = getRipplelinesState("address"+key);
      if(getlines.ripplelines["address"+key]!=undefined) {
        var toformat = _.map(getlines.ripplelines["address" + this.props.attributes.reportnumber].lines,function(line) { 
          var balance = FormatUtils.truncToNdecimal(line['balance'],4);
          var name = _.filter(gatewayNames,function(gateway) {
            return gateway.address == line.account;
          });
          var obj = {
            balance: balance,
            currency:line['currency'],
            account: line['account'],
            limit: line ['limit'],
            limit_peer: line['limit_peer'],
            no_ripple: line['no_ripple'],
            quality_in: line['quality_in'],
            quality_out: line['quality_out']
          };
          if(line.currency == "XRP") {
            obj['name']=undefined;
          } else {
            if(name[0]) {
              obj['name']=name[0].name;
            } else { obj['name']=line['account'];}
          }
          return obj;
        });
      }
      getlines.ripplelines["address"+key].lines = toformat;
      this.setState({ripplelines:getlines.ripplelines, isloading:false});
    },
    _onChangeRippleinfos: function() {
      var key = this.props.attributes.reportnumber;
      this.setState(getRippleinfosState("address"+key));
    },

    mouseOverLinesHandler: function(params) {
      var self = this;
      return function() {
        self._onMouseOverLines(params);
      }
    },

    mouseOutLinesHandler: function(params) {
      var self = this;
      return function() {
        self._onMouseOutLines(params);
      }
    },

    _onMouseOverLines : function(params) {
      var currency = params[0];
      var issuer = params[1];
      d3.selectAll("#BalanceOverviewChart .arc").style("opacity",0.25);

      var d3selection = this.isOther(params);

      d3.select(d3selection).style("opacity",1);
      d3.select(d3selection).selectAll(".piechartLabel").style({
          "fill":"#004756"
      });
      d3.select(d3selection).selectAll(".piecharthiddenLabel").style({
        "visibility":"visible",
        "fill":"#004756"
        });
    },

    _onMouseOutLines: function(params) {
      var currency = params[0];
      var issuer = params[1];
      d3.selectAll("#BalanceOverviewChart .arc").style("opacity",1);

      var d3selection = this.isOther(params);

      d3.select(d3selection).selectAll(".piecharthiddenLabel").style("visibility","hidden");
      d3.select(d3selection).selectAll(".piechartLabel").style({
          "fill":"#83828C"
      });
    },

    isOther: function(params) {
      var currency = params[0];
      var issuer = params[1];

      if(d3.select("#BalanceOverviewChart"+currency+issuer)[0][0] == null) {
        var d3selection = "#BalanceOverviewChartother";
      } else  {
        var d3selection = "#BalanceOverviewChart"+currency+issuer;
      }

        return d3selection;
    }

});

module.exports = RippleAccount;
