var React = require('react');
//react-bootstrap
var CollapsableMixin = require('react-bootstrap').CollapsibleMixin;
//React addons
var classSet = React.addons.classSet;
var viewcommon =require('ViewCommon');

var CollapsableRow = React.createClass({
	mixins: [CollapsableMixin],
	getCollapsibleDOMNode: function(){
    	return this.refs.panel.getDOMNode();
	},

	getCollapsibleDimensionValue: function(){
    	return this.refs.panel.getDOMNode().scrollHeight;
	},
	onHandleToggle: function(e){
    	// e.preventDefault();
    	this.setState({expanded:!this.state.expanded});
  	},
  	render: function(){
  		var rowstyle = viewcommon.collapsablerow;
	    var styles = this.getCollapsibleClassSet();
	    var text = this.isExpanded() ? 'Hide' : 'Show';
	    if(this.props.type != "td") {
		    return (
		      <div onClick={this.onHandleToggle} style={rowstyle}>
		        { this.props.content }
		        <div ref='panel' className={classSet(styles)}>
		          {this.props.children}
		        </div>
		      </div>
		    );
		} else if(this.props.type == "td") {
			return (
		      <tr onClick={this.onHandleToggle} style={rowstyle}>
		      	<td>{this.props.content}</td>
		      	<tr colSpan="5" ref='panel' className={classSet(styles)}><td>{this.props.children}</td></tr>
		      </tr>
		    );
		}
	}
});

module.exports = CollapsableRow;