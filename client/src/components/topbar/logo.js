var React = require('react');

var Logo = React.createClass({
	render: function(){
		return (
			<div id="logo" className="col-xs-12 col-sm-2">
        		<a href="/">heartbit</a>
         	</div>
        )
	}
});

module.exports = Logo;