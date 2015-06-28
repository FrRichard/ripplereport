var React = require('react');

/** @jsx React.DOM */

var Sidemenu = React.createClass({
	render: function(){
		return ( 
		  <ul className="nav main-menu">
		    <li> 
		      <a href="#" className="active">
		        <i className="fa fa-dashboard"></i>
		        <span className="hidden-xs">Dashboard</span>
		      </a>
		    </li>
		  </ul>
		)
	}
});

module.exports = Sidemenu;