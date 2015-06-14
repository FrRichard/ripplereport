var React = require('react');
var RealtimeActions = require('RealtimeActions');
var RippleTradeStore = require('RippleTradeStore');

function getRipplePriceState(key) {
  var rippleprice = RippleTradeStore.getSpecific(key);
  return {
    id: new Date().getTime(),
    rippleprice:rippleprice
  }
}

var Price =  React.createClass({

	getInitialState: function() {
		var isloading = true;
		return { isloading:isloading }
	},

	componentDidMount: function() {

	},

    componentDidUpdate: function() {
    },

    render: function() {

        return (<div> PRice !!  yuhuuu!!</div>);
    },

/// LISTENER ON COMPONENT UPDATE !


});


module.exports = Price;