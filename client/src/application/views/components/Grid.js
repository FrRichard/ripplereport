var React = require('react');
var DashboardActions = require('DashboardActions');
var GridStore = require('GridStore');

var GridElements = React.createClass({

    render: function() {
      this.updateGrid();
      return (<ul />);
    },

    componentDidMount: function() {
      var self=this;
      var gridster = $(this.getDOMNode()).gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [350, 100],
        resize: {
            enabled: false
          },
        draggable: {
            handle: '.panel-heading, .panel-handel'
          }
      }).data('gridster');


      var renderWidget = function() {
        var reportnumber = self.props.reportnumber;
        var mapping = 
          self.props.items.map(function(item, i) {
       
            var attributes = item.props.attributes; 
            var key = attributes.key;
            var datatype = attributes.datatype;
            item.props.attributes['reportnumber'] = reportnumber;

            gridster.add_widget(
                (('<li class="item" id={key} datatype={datatype} reportnumber={reportnumber}>  </li>'.replace('{key}', key)).replace('{datatype}',datatype))
                  .replace('{reportnumber}',reportnumber), 
                attributes.width,
                attributes.height,
                attributes.col,
                attributes.row
              );

            React.render(item, document.getElementById(key));

          });
        
          var res = $.when.apply(null,mapping);

          return res;
      }

      renderWidget().then(function() {
        DashboardActions.registerCurrentRef(gridster);
      });

    },

    updateGrid: function() {
      _.each(this.props.items, function(item) {
          $('#'+item.props.attributes.key).attr('data-row',item.props.attributes.row);
      });
    }


});

module.exports = GridElements;