'use strict';

var React = require('react');



  function SelectField() {
    this.onChange = this.onChange.bind(this);
  }

  SelectField.prototype.onChange=function(e) {
    this.props.onChange(e.target.value);
  };

  SelectField.prototype.render=function() {
    var $__0=     this.props,id=$__0.id,options=$__0.options,label=$__0.label,value=$__0.value;
    var mappedOpts =
      options.map(function(each)  {return React.createElement("option", {key: each, value: each}, each);});

    return (
      React.createElement("div", null, 
        React.createElement("label", {htmlFor: id}, label), 
        React.createElement("select", {id: id, value: value, onChange: this.onChange}, 
          mappedOpts
        )
      )
    );
  };



module.exports = SelectField;
