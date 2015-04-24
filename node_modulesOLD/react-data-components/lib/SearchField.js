'use strict';

var React = require('react');



  function SearchField() {
    this.onChange = this.onChange.bind(this);
  }

  SearchField.prototype.onChange=function(e) {
    this.props.onChange(e.target.value);
  };

  SearchField.prototype.render=function() {
    return (
      React.createElement("div", null, 
        React.createElement("label", {htmlFor: this.props.id}, this.props.label), 
        React.createElement("input", {
          id: this.props.id, 
          type: "search", 
          value: this.props.value, 
          onChange: this.onChange}
        )
      )
    );
  };



module.exports = SearchField;
