var React = require('react');
var RealtimeActions = require('RealtimeActions');
var RippleTradeStore = require('RippleTradeStore');
var ParametersManager = require('ParametersManager');

function getRipplePriceState(key) {
  var rippleprice = RippleTradeStore.getSpecific(key);
  return {
    id: new Date().getTime(),
    rippleprice:rippleprice
  }
}

var Price =  React.createClass({

	getInitialState: function() {
		var currentParams = ParametersManager.getCurrentParams();
		console.log('view currenct params',currentParams);
		var isloading = true;
		return { 
			isloading:isloading,
			currentParams:currentParams
		}
	},

	componentDidMount: function() {

	},

    componentDidUpdate: function() {
    	var channel = 
    	RippleTradeStore.addChangeListener
    },

    render: function() {

        return (<div> PRice !!  yuhuuu!!</div>);
    },

/// LISTENER ON COMPONENT UPDATE !


});


module.exports = Price;