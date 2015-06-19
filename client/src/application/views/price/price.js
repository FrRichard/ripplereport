var React = require('react');
var RealtimeActions = require('RealtimeActions');
var RippleTradeStore = require('RippleTradeStore');
var DataroomsStore = require('DataroomsStore');
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
        var availablePairs = DataroomsStore.getSpecific('pairs').pairs;
		var currentParams = ParametersManager.getCurrentParams();
		var isloading = true;
		var channel = currentParams.platform + sep + currentParams.item + sep + currentParams.currency;
		var pair = currentParams.item + sep + currentParams.currency;
		var platform = currentParams.platform;
		var data = {};
        var isReversed = false;
        console.log(pair,platform);
        
		return { 
			isloading: isloading,
			currentParams: currentParams,
			channel: channel,
			pair: pair,
			platform: platform, 
			data: data,
            isReversed: isReversed,
            availablePairs: availablePairs
        }
    },

    componentDidMount: function() {
        var channel = this.state.channel;
        
        DataroomsStore.addChangeListener(this._onChangeDataroom);
        console.log("VIEW_STATE",this.state);

    },

    componentDidUpdate: function() {
  
        
    },

    render: function() {
        var self = this;
        console.log("VIEW_STATE", this.state);
        var options = [];
        if(this.state.availablePairs) {
         
        }
        if(!this.state.data.price) {
            var page = <div> This Pair Is Not Available </div>;
        } else if(this.state.isReversed) {
            var option = <option selected>  {this.state.data.currency + '/' + this.state.data.item} </option>;
            options.push(option);
            _.each(this.state.availablePairs, function(platform,currency) {
                if(currency != self.state.data.currency) {
                    var option = <option> {currency}/XRP  </option>;
                    options.push(option);
                }
            });

            var page = <span>
                    <div> {1/this.state.data.price}  </div>
                    <select onChange = {this._changePair}> 
                        {options}                           
                    </select>
                </span>;
        } else {
            var option = <option selected>  {this.state.data.item + '/' + this.state.data.currency} </option>;
            options.push(option);
            _.each(this.state.availablePairs, function(platform,currency) {
                if(currency != self.state.data.currency) {
                    var option = <option> XRP/{currency}  </option>;
                    options.push(option);
                }
            });
            var price = Math.trunc(this.state.data.price*Math.pow(10,8))/Math.pow(10,8);
            var page = <span>
                        <div> {price}  </div>
                        <div>
                            <select onChange = {this._changePair}> 
                                {options}
                            </select>
                        </div>
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
        console.log("_onPriceChange!",data);
        if(data.isReversed) {
            this.setState({
                data: data,
                isReversed: true
            });
        } else {
            this.setState({
                data: data
            });
        }

    },

    _changePair: function(e) {

        console.log('ChangePair $(e.target).val():', $(e.target).val());
        var pair =  $(e.target).val();
        // var item = pair[0];
        // var currency = pair[1];
        ParametersManager.changeGlobalPair(pair);
        
        console.log("New Pair", pair);
    },

    _onChangeDataroom: function(dataroom) {
        var self = this;
        console.log("DATAROOOOM has been changed !!!!");
        var allRoom = DataroomsStore.getSpecific('all');
        _.each(allRoom, function(room) {
            RippleTradeStore.removeListener(room, self._onPriceChange);
        })
        console.log(DataroomsStore.getSpecific('current'));
        var pair = DataroomsStore.getSpecific('current').current;

        this.setState({
            pair: pair
        });

        var channel =  this.state.platform + ':' + pair;
        console.log("listenerchannerl:", channel);
        RippleTradeStore.addChangeListener(channel, this._onPriceChange);

        var lastData = RippleTradeStore.getSpecific(pair);
        console.log("lastData:",lastData);
    }

/// LISTENER ON COMPONENT UPDATE !


});


module.exports = Price;