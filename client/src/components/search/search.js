var React = require('react');

var Search = React.createClass({
	render: function(){
		return (
			<div id="search">
                  <input type="text" placeholder="Find platforms, currencies..."/>
                  <i className="fa fa-search"></i>
            </div>
        )
	}
});

module.exports = Search;