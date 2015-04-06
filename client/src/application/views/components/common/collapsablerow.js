var React = require('react');
//react-bootstrap
var CollapsableMixin = require('react-bootstrap').CollapsableMixin;
//React addons
var classSet = React.addons.classSet;
var viewcommon =require('ViewCommon');

var CollapsableRow = React.createClass({
	mixins: [CollapsableMixin],
	getCollapsableDOMNode: function(){
    	return this.refs.panel.getDOMNode();
	},

	getCollapsableDimensionValue: function(){
    	return this.refs.panel.getDOMNode().scrollHeight;
	},
	onHandleToggle: function(e){
    	e.preventDefault();
    	this.setState({expanded:!this.state.expanded});
  	},
  	render: function(){
  		// console.log("rooooooooooooooooooooooow",this.props);
  		var rowstyle = viewcommon.collapsablerow;
	    var styles = this.getCollapsableClassSet();
	    var text = this.isExpanded() ? 'Hide' : 'Show';
	    return (
	      <div onClick={this.onHandleToggle} style={rowstyle}>
	        { this.props.content }
	        <div ref='panel' className={classSet(styles)}>
	          {this.props.children}
	        </div>
	      </div>
	    );
	}
});

module.exports = CollapsableRow;