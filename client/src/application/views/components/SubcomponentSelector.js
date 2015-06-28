var React = require('react');


var SubcomponentSelector = {
  
  selector: function(config) {

    var Items = [];
   
	_.each(config,function(item) {

		if(item.datatype) {
			Items[item.datatype] = require('./subcomponents/'+ item.datatype +'.js');  
		} else {
			Items['abstractsubcomponent']  = require('./subcomponents/abstractsubcomponent.js'); 
		}
	});
	
    return Items;
  },

  selector_simple: function(item) {
  	item = require('./subcomponents/' + item +'.js');

  	return item
  }

};

module.exports = SubcomponentSelector;