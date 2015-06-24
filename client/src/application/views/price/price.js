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
    },

    componentDidUpdate: function() {
  
        
    },

    render: function() {
        var self = this;
        var options = [];
        console.log("===============RENDER=================",this.state);
        if(this.state.availablePairs) {
         
        }
        if(!this.state.data.price) {
            var page = <div> This Pair Is Not Available </div>;
        } else if(this.state.isReversed) {
            // var option = <option value={this.state.data.currency+ "/XRP/" + this.state.platform} >  {this.state.data.currency + '/' + this.state.data.item} </option>;
            // options.push(option);
            // _.each(this.state.availablePairs, function(platform,currency) {
            //     if(currency != self.state.data.currency) {
            //         var option = <option value={currency+"/XRP/" + platform}>  {currency}/XRP  </option>;
            //         options.push(option);
            //     }
            // });

            // var _price = <span>
            //                 <div> {1/this.state.data.price}  </div>
            //             </span>;
            // var _select = <select onChange = {this._changePair}> 
            //                 {options}                           
            //              </select>;
        } else {
            var option = <option value={"XRP/" + this.state.data.currency + "/" + this.state.platform } selected >  {this.state.data.item + '/' + this.state.data.currency} </option>;
            options.push(option);
            _.each(this.state.availablePairs, function(platform,currency) {
                if(currency != self.state.data.currency) {
                    var value = "XRP/"+currency+"/" + platform ; 
                    var option = <option key={value} value={value}>XRP/{currency}</option>;
                    options.push(option);
                }
            });
            var price = Math.trunc(this.state.data.price*Math.pow(10,8))/Math.pow(10,8);
            var _price = <span>
                            <div>{price}</div>
                        </span>;
            // var _select = <select onChange = {this._changePair} > 
            //                 {options}                           
            //              </select>;
        }
        return (
        	<div className="priceView"> 
        		{_price}
                 <select onChange = {this._changePair}> 
                    {options}
                </select>
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

    _onPriceChange: function(pair,platform,channel) {
        var self= this;
        return function() {
            // var pair = this.state.pair;
            // var platform = this.state.platform;
            var data = RippleTradeStore.getSpecific(pair, platform)[0];
            var data2 = RippleTradeStore.getSpecific(pair, platform);
            if(data.isReversed) {
                this.setState({
                    data: data,
                    isReversed: true
                });
            } else {
                self.setState({
                    data: data,
                    pair: pair,
                    platform: platform,
                    channel: channel
                });
            }
        }

    },

    _changePair: function(e) {

        var channel =  $(e.target).val();
        var item = channel.split("/")[0];
        var currency = channel.split("/")[1];
        var platform = channel.split("/")[2];
        var pair = item + ':' + currency;
        var fchannel = platform + ':' + pair ;
        var data = this.state.data;
        data.currency = currency;
        data.item = item;
        data.platform = platform;
        this.setState({
            pair: pair,
            platform: platform,
            channel: fchannel,
            data:data
        });
        // var item = pair[0];
        // var currency = pair[1];
        ParametersManager.changeGlobalPair(channel);

    },

    _onChangeDataroom: function(dataroom) {
        var self = this;
        var allRoom = DataroomsStore.getSpecific('all').all;

        _.each(allRoom, function(room) {
            RippleTradeStore.removeListener(room, self._onPriceChange);
        })

        var pair = DataroomsStore.getSpecific('current').current;
        var pairs = DataroomsStore.getSpecific('pairs').pairs;

        _.each(pairs, function(platform, currency) {
            var cur = pair.split(':')[1];
            if(cur == currency) {
                self.platform = platform;
            }
        });
        var channel =  this.platform + ':' + pair;

 
        RippleTradeStore.addChangeListener(channel, this._onPriceChange(pair,this.platform,channel));

        var lastData = RippleTradeStore.getSpecific(pair);
    }

/// LISTENER ON COMPONENT UPDATE !


});


module.exports = Price;