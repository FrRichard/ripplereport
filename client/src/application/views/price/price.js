var React = require('react');
var RealtimeActions = require('RealtimeActions');
var RippleTradeStore = require('RippleTradeStore');
var ParametersManager = require('ParametersManager');
var FormatUtils = require('FormatUtils');

function getRipplePriceState(key) {
  var rippleprice = RippleTradeStore.getSpecific(key);
  return {
    id: new Date().getTime(),
    rippleprice:rippleprice
  }
}

var Price =  React.createClass({

	getInitialState: function() {
		var sep = ':';
		var currentParams = ParametersManager.getCurrentParams();
		console.log('view current params',currentParams);
		var isloading = true;
		var channel = currentParams.platform + sep + currentParams.item + sep + currentParams.currency;
		var pair = currentParams.item + sep + currentParams.currency;
		var platform = currentParams.platform;
		var data = {};
		return { 
			isloading: isloading,
			currentParams: currentParams,
			channel: channel,
			pair: pair,
			platform: platform,
			data: data
		}
	},

	componentDidMount: function() {
		var channel = this.state.channel;
		RippleTradeStore.addChangeListener(channel, this._onPriceChange);
	},

    componentDidUpdate: function() {
  
    	
    },

    render: function() {
    	console.log("PRIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIICEEEEEEEEEEEEEEEESTAAAAAAAAAATE",this.state);
        return (
        	<div className="priceView"> 
        		{this.state.data.price ? 
        			<span>
	        			<div> {Math.trunc(this.state.data.price*Math.pow(10,8))/Math.pow(10,8)}  </div>
	        			<div> {this.state.data.item + '/' + this.state.data.currency} </div>
	        		</span>
	        		: "FUCK YOU!"
        		}
        	</div>



        );
    },

    _onPriceChange: function(price) {
    	var pair = this.state.pair;
    	var platform = this.state.platform;
    	var data = RippleTradeStore.getSpecific(pair, platform)[0];
    	console.log("===================> PRICE CHANGED !!!", price);
    	this.setState({
    		data: data
    	});
    }

/// LISTENER ON COMPONENT UPDATE !


});


module.exports = Price;