var React = require("react");
var Account = require('Account');
var config = require('config');

var Router = Backbone.Router.extend({

    routes: {
        "account": "account"
    },

    initialize: function(params) {
   
	    Backbone.history.start({
            pushState: true
        });
    },

    account: function(params) {

        var dashboard_config = config.dashboards.account;

    	React.render(<Account dashboard_config={ dashboard_config } />, document.getElementById('app'));
    },

    render: function(callback) {

    },

    update: function(callback) {

    }

});


module.exports = Router;




// $(".findrippleid").click(function() {
// 	var id = toresolve.val();
// 	var address;
// 	var url = "/ripple/id/?id="+id;
// 	// var url = "/ripple/account_info/?id="+id;
// 	$.when($.get(url ,function(res,status) {
// 			console.log(res);
// 			address = res.address;
// 		}))
// 	.done(function() {
// 		console.log(address);
// 		url = "/ripple/account_info/?id="+address;
// 		$.get(url, function(res, status) {
// 			console.log(res);
// 		});
// 	});
// });
