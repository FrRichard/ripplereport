var React = require('react');

var Dashboard = require('Dashboard');
var Searchbar = require('SearchbarTransaction');
var Topbar = require('Topbar');
var TransactionStore = require('TransactionStore');
var IdStore = require("IdStore");
var AccountActions = require("AccountActions");

// var transactionParser = require('TransactionParser');
var transactionParser = require('ripple-lib-transactionparser');
var viewbuilder = require('TransactionViewBuilder');
var util = require('util');
require('jsonViewer');
// bootstrap
var Panel = require('react-bootstrap').Panel;


var Transaction = React.createClass({

	getInitialState: function() {
		return { isloaded:false }
	},

	componentDidMount: function() {
		TransactionStore.addChangeListener("transaction0", this._onChangeTransaction);
		IdStore.addChangeListener("address1", this._onChangeIds);
	},

    componentDidUpdate: function() {
		$('#transaction_rawjson').jsonViewer(this.state.data.transaction);
		$("#transaction_rawjson").bind('click',
               function(){
                   $(this).attr('contentEditable',true);
        });
    },

    render: function() {
    	if(this.state.isloaded == false && this.state.isvalid != "success") {
			var page =   
				<div id="bigsearch">
		        	<Panel>
		        		<div>
		        			<img id="ripplelogo" src={'./img/Greenripple.png'}  />
		        			<p id="rippletitle"> Transaction Viewer </p>
		        		</div>
		        		<Searchbar/>
		    		</Panel>
				</div>;
		} 
		else  {
			if(this.state.isvalid == "success") {
				if(this.state.data.transaction.tx.TransactionType == "OfferCreate") {
					var Main = viewbuilder.offercreate(this.state.data, this.state.names);
				} else {
					var Main = viewbuilder.simple(this.state.data);
				}
			} else {
				data = "";
			}
			var page = 
				<div>
					<Topbar searchbar={Searchbar} tool={"transaction"}/>
					{Main}
				</div>;
		
		} 

        return (<div>{page}</div>);
    },


    _onChangeTransaction: function() {
    	var self = this;
    	var tx =TransactionStore.getSpecific("transaction0")["transaction0"];
    	if(tx.result) {
    		if(tx.result != "error") {
		    	if(tx.transaction.tx.TransactionType == "OfferCreate") {
			    	var parsedbalance = transactionParser.parseBalanceChanges(tx.transaction.meta);
			    	this.addresslist = [];
			    	_.each(parsedbalance, function(balance, address) {
			    		self.addresslist.push(address);
			    	});
			    	AccountActions.rippleid(this.addresslist);
			    	this.setState({
			    		data:tx,
			    		isvalid : tx.result,
			    		isloaded: false
			    	});
			    } else {
			    	this.setState({
			    		data:tx,
			    		isvalid : tx.result,
			    		isloaded: true
			    	});
			    }
			}
		}
    },

    _onChangeIds: function() {
    	var names = {};
    	var ids =IdStore.getAll();
    	_.each(this.addresslist, function(a,i) {
			names[a] = "~"+ids["address"+(i+1)].username;
			if(ids["address"+(i+1)].username == "This address has no username") {
				names[a] = "No ~name";
			}
		});
		this.setState({
    		names:names,
    		isloaded: true
    	});
    }

});

module.exports = Transaction;