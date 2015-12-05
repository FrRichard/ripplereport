var React = require('react');
var DashboardActions = require('DashboardActions');
var GridStore = require('GridStore');
// var gridstack = require('gridstack');


var GridElements = React.createClass({

    render: function() {
      this.updateGrid();
      return (<ul />);
    },

    componentDidMount: function() {
      var self=this;
      // var gridster = $(this.getDOMNode()).gridster({
      //   widget_margins: [5, 5],
      //   widget_base_dimensions: [350, 100],
      //   resize: {
      //       enabled: false
      //     },
      //   draggable: {
      //       handle: '.panel-heading, .panel-handel'
      //     }
      // }).data('gridster');

      var options = {
        width:12,
        always_show_resize_handle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        resizable: {
            handles: 'e, se, s, sw, w'
        },
        cell_height:100
      };
      var gridstack = $('.grid-stack').gridstack(options).data('gridstack');


      var renderWidget = function() {
        var reportnumber = self.props.reportnumber;
        var mapping = 
          self.props.items.map(function(item, i) {
       
            var attributes = item.props.attributes; 
            var key = attributes.key;
            var datatype = attributes.datatype;
            item.props.attributes['reportnumber'] = reportnumber;

            gridstack.add_widget(
                (('<div class="grid-stack-item" id={key} datatype={datatype} reportnumber={reportnumber}>  </div>'.replace('{key}', key)).replace('{datatype}',datatype))
                  .replace('{reportnumber}',reportnumber), 
                attributes.col,
                attributes.row,
                attributes.width,
                attributes.height
              );

            React.render(item, document.getElementById(key));

          });
        
          var res = $.when.apply(null,mapping);

          return res;
      }

      renderWidget().then(function() {
        // DashboardActions.registerCurrentRef(gridster);
      });

    },

    updateGrid: function() {
      _.each(this.props.items, function(item) {
          $('#'+item.props.attributes.key).attr('data-row',item.props.attributes.row);
      });
    }


});

module.exports = GridElements;