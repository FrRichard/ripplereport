var React = require('react');

var OptionList = React.createClass({
	
	render:function() {
		var self=this;
		var optionlist = function() {
	    	console.log(self.props);
	      	// if(self.props.currencylist) {
	      	var res= _.map(self.props.currencylist, function(currency) { return <option value={currency}> {currency} </option>  });
	      	// } else {
	      		var res = React.createElement('option');
	      		console.log(res);
	      	// }
	      	return res;
    	};
		// console.log(this.props);
		// if(this.props.currencylist) {
		// 	var optlist=optionlist();
		// } else {
			var optlist = '<option> test </option>';
		// }
		var res= _.map(self.props, function(currency) { return <option > test </option>  });

		// return ({_.map(this.props, function(currency) { return <option > test </option>  })});
		return <span></span>;
	}
});

var DropDown = React.createClass({


 	render:function() {	


 		var self=this;

 		if(this.props.currencylist) {
 			var optlist = _.map(this.props.currencylist, function(currency) { return <option value={currency}> {currency} </option>  });
 		} else {
 			var optlist = undefined;
 				
 		}

		var mescouilles = function() { alert("mescouilles");};
	    return  (<select className='fiatselector' onChange={this.onSelectCurrency} value={this.props.selectedcurrency}>
	    				{ optlist }
	              </select>);
	}
});

module.exports = DropDown;
