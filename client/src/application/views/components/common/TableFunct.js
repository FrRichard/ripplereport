var sortColumn = require('reactabular').sortColumn;
var React = require('react');

var table_funct = {
  header: function(columns,data) {
    return({
        onClick: (column) => {
            sortColumn(
                columns,
                column,
                data,
                this.setState.bind(this)
            );
        },
    });
  },

collapsable: function(e,content) {
    if($(e.target).parents('tr').hasClass('iscollapsed')) {
        $(e.target).parents('tr').next().remove();
        $(e.target).parents('tr').removeClass('iscollapsed');
    } else {
        $(e.target).parents('tr').after(content);
        $(e.target).parents('tr').addClass('iscollapsed');
    }

},

filldata: function(data, props, hiddenprops) {
    var result = [];
    _.each(data, function(d) {
        var tofill = {};
        tofill.hiddenprops = {};

        _.each(props, function(p) {
            tofill[p] = d[p];
            tofill["hidden"] = false;
        });

        _.each(hiddenprops, function(hp) {
            tofill.hiddenprops[hp] = d[hp];
            tofill.hiddenprops["hidden"] = true;
        });

        result.push(tofill);

    });

    return result;
}

}

module.exports = table_funct;