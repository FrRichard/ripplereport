var React = require('react');



var rawjson = function() {

	this.createView = function(params) {
		// console.log(paraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaams);
		var custom_params = {};
		_.each(params, function(value,key) {
			custom_params[key] = value;
		});

		var view = 
			<div className="panel panel-default rawjson_panel" style={custom_params}>
		        <div className="panel-heading clearfix">
		          <div className="panel-title  pull-left transaction_header_title" onMouseOver="" onMouseOut="">
		            <i className=""></i>
		            <span className="panel-title-text">{params.title}</span>
		          </div>
		        </div>
	    		<div className="panel-body">
	    				<pre id="transaction_rawjson"></pre>
	    		</div>
	    	</div>;


		return view;
	}


};



module.exports =rawjson;