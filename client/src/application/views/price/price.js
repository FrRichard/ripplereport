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
        var isReversed = false;
		return { 
			isloading: isloading,
			currentParams: currentParams,
			channel: channel,
			pair: pair,
			platform: platform,
			data: data,
            isReversed: isReversed
		}
	},

	componentDidMount: function() {
		var channel = this.state.channel;
		RippleTradeStore.addChangeListener(channel, this._onPriceChange);
	},

    componentDidUpdate: function() {
  
    	
    },

    render: function() {
    	console.log("PRICESTATE",this.state);

        if(!this.state.data.price) {
            var page = <div> This Pair Is Not Available </div>;
        } else if(this.state.isReversed) {
            console.log("REVERSED PRICE VIEW!");
            var page = <span>
                    <div> {1/this.state.data.price}  </div>
                    <div> {this.state.data.currency+ '/' + this.state.data.item } </div>
                </span>;
        } else {
            var price = Math.trunc(this.state.data.price*Math.pow(10,8))/Math.pow(10,8);
            console.log("pppppppppppppprrrrrrrrrrrrrrrrrrriiiiiiiiiiiiiiiiiiiiice",price);
            var page = <span>
                        <div> {price}  </div>
                        <div> {this.state.data.item + '/' + this.state.data.currency} </div>
                    </span>;
        }
        return (
        	<div className="priceView"> 
        		{page}
        	</div>



        );
    },

    // _onPriceChange: function(price) {
    // 	var pair = this.state.pair;
    // 	var platform = this.state.platform;
    // 	var data = RippleTradeStore.getSpecific(pair, platform)[0];
    // 	console.log("===================> PRICE CHANGED !!!", data.price);
    // 	this.setState({
    // 		data: data
    // 	});
    // },

    _onPriceChange: function(price) {
        var pair = this.state.pair;
        var platform = this.state.platform;
        var data = RippleTradeStore.getSpecific(pair, platform)[0];
        console.log("===================> PRICE CHANGED !!!", data);
        if(data.isReversed) {
            this.setState({
                data: data,
                isReversed: true
            });
        } else {
            this.setState({
                data: data,
                isReversed: false
            });
        }
    }

/// LISTENER ON COMPONENT UPDATE !


});


module.exports = Price;