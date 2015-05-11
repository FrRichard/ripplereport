var React = require('react');
var RipplecapitalizationStore = require('RipplecapitalizationStore');
//React-bootstrap
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;
var viewcommon = require('ViewCommon');
var adaptgrid= require('AdaptGrid');
//utils
var FormatUtils = require("FormatUtils");


function getRipplecapitalizationState(key) {
	var ripplecapitalization= RipplecapitalizationStore.getSpecific(key);
	return {
		id: new Date().getTime(),
		ripplecapitalization:ripplecapitalization
	}
}

var RippleCapitalization = React.createClass({

	getInitialState: function() {
		var ripplecapitalization={};
		var isloading = true;
		return { ripplecapitalization:ripplecapitalization, isloading:isloading};
	},


	componentWillMount: function() {

	},

	componentDidMount: function() {
		var key = this.props.attributes.reportnumber;
		var address = "address" + key;
		this.AdaptGrid = new adaptgrid();
		RipplecapitalizationStore.addChangeListener(address, this._onChangeRipplecapitalization);
		RipplecapitalizationStore.addChangeListener("isloading", this._onLoading);
	},

	componentWillUnmount: function() {
		RipplecapitalizationStore.removeChangeListener(this._onChangeRipplecapitalization);
	},

	render: function() {
		var self =this;
		this.address= "address" + this.props.attributes.reportnumber;
		var panelstyle = viewcommon.panellist;
		var rows = [];
		if(this.state.ripplecapitalization[this.address]) {
			_.each(this.state.ripplecapitalization[this.address], function(cap,i) {
				var hotwallets = [];
				_.each(cap['hotwallets'], function(hotwallet) {
					var address = { address:hotwallet };
					hotwallets.push(
						<span>  <a href={"/app?"+JSON.stringify(address)} target="_blank" value={hotwallet}> {hotwallet} </a> </span>
					);
				});
				if(cap['amount'] != 0) {
					rows.push(
					<tr key={"capitalizationresult_"+i} onMouseOver={self.mouseOverLinesHandler([cap['currency'],cap['issuer']])}    onMouseOut={self.mouseOutLinesHandler([cap['currency'],cap['issuer']])}>
		              <td key={"capitalizationcurrency"+i}> {cap['currency']}  </td>
		              <td key={"capitalizationamount"+i}> {FormatUtils.formatValue(cap['amount'])} </td>
		              <td key={"capitalizationhotwallets"+i}> {hotwallets} </td>
		            </tr>);
				}
			});
		}

		return ( 
			<div className="panel panel-default">
		        <div className="panel-heading clearfix">
		          <div className="panel-title  pull-left" onMouseOver="" onMouseOut="">
		            <i className={this.props.attributes.icon}></i>
		            <span className="panel-title-text">{this.props.attributes.title}</span>
		          </div>
		        </div>
        		<div className="panel-body" style={panelstyle}>
        		{ this.state.isloading ?  <div><img className="loading" src={'./img/loading2.gif'} /></div> : ''}
        		{ !this.state.isloading ?
					this.state.ripplecapitalization ?
						<Table striped bordered condensed hover>
		                    <thead>
		                      <th> Currency </th>
		                      <th> Amount </th>
		                      <th> Hotwallets </th>
		                    </thead>     
		                    <tbody>
		                      {rows}    
		                    </tbody>
	             		</Table>
	             	: <div className="didntissueiou"> This account didnt issued any IOUs </div>
	            : "" }
				</div>
			</div>
		);
	},

	_onChangeRipplecapitalization: function() {
		var key = this.props.attributes.reportnumber;
		this.address= "address" + key;
		var isloading = false;
		var capitalizationstate = getRipplecapitalizationState("address" + key).ripplecapitalization;
		if(capitalizationstate["address"+key].length >0) {
			this.setState({ ripplecapitalization:capitalizationstate,
			isloading:isloading});
		} else {
			this.setState({ ripplecapitalization:false,
			isloading:isloading});
			// this._onEmptyCap(["ripplecapitalization","capitalizationoverview"]);
		}
	},

	_onLoading: function() {
		this.setState({
			isloading:true
		});
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
      var d3selection = this.isOther(params);

      d3.selectAll("#CapitalizationOverviewChart .arc").style("opacity",0.5);
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
      var d3selection = this.isOther(params);
      d3.selectAll("#CapitalizationOverviewChart .arc").style("opacity",1);
      d3.select(d3selection).selectAll(".piecharthiddenLabel").style("visibility","hidden");
      d3.select(d3selection).selectAll(".piechartLabel").style({
          "fill":"#83828C"
      });
    },

    _onEmptyCap: function(id) {
    	
    	this.AdaptGrid.reorganize(id);
    },

    isOther: function(params) {
      var currency = params[0];
      var issuer = params[1];

      if(d3.select("#CapitalizationOverviewChart"+currency+issuer)[0][0] == null) {
        var d3selection = "#CapitalizationOverviewChartother";
      } else  {
        var d3selection = "#CapitalizationOverviewChart"+currency+issuer;
      }

        return d3selection;
    }

});

module.exports = RippleCapitalization;