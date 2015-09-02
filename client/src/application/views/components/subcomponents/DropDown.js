var React = require('react');

var OptionList = React.createClass({
	
	render:function() {
		var self=this;
		var optionlist = function() {
	    	console.log(self.props);
	      	var res= _.map(self.props.currencylist, function(currency) { return <option value={currency}> {currency} </option>  });
	      	var res = React.createElement('option');
	      	return res;
    	};
		var optlist = '<option> test </option>';
		var res= _.map(self.props, function(currency) { return <option > test </option>  });

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

	    return  (<select className='fiatselector' onChange={this.onSelectCurrency} value={this.props.selectedcurrency}>
	    				{ optlist }
	              </select>);
	}
});

module.exports = DropDown;
