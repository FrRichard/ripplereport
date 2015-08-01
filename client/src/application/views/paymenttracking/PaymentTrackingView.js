var React = require('react');
var Dashboard = require('Dashboard');
var ParametersManagerConfig = require('ParametersManagerConfig');
var Panel = require('react-bootstrap').Panel;
// account components
var RippleidStore =require('IdStore');
var RippleinfosStore = require('InfosStore');
var PaymentStore = require('PaymentStore');
var Account = require('Account');
var AccountActions = require('AccountActions');


var App = React.createClass({

	getInitialState: function() {
		return { page:"welcome" } ;
	},

	componentDidMount: function() {
		// RippleidStore.addChangeListener("wrongaddress" ,this._onWrongId);
		RippleidStore.addChangeListener("rightaddress_fromidstore" ,this._onRightId_fromIdStore);
		RippleinfosStore.addChangeListener("rightaddress_frominfosstore" ,this._onRightId_fromInfosStore);
	},


    render: function() {
    	var Searchbar = this.props.searchBar;
    	var Title = this.props.title;
    	if(this.state.page == "welcome") {
			var page =   
				<div id="bigsearch">
			      	<div className="expanded-panel">
			       		<div>
				         	<div>
					        	<Panel>
					        		<div>
					        			<img id="ripplelogo" src={'./img/Greenripple.png'}  />
					        			<p id="rippletitle" > {Title} </p>
					        		</div>
					        		<Searchbar/>
					    		</Panel>
					    	</div>
				    	</div>
				    </div>
				</div>;
		}

		if(this.state.page == "report") {
			var page = <Account searchbar={Searchbar}/>;
		}

        return (<div>{page}</div>);
    },

    _onRightId_fromIdStore: function() {
    	var address = RippleidStore.getSpecific("address1")["address1"];
    	// console.log("adreeeeeeeeeeeeessssssssssssssss ID",address);
        // AccountActions.viewready(idcollection,"id");
        AccountActions.accountTransactions(address.raw.toJSON());
         PaymentStore.cleanAll();
        var params = ParametersManagerConfig.transactiontrackingparams;
		var width = $('#selectWidth').val();
		var depth = $('#selectDepth').val();
		var currency = $('#selectCurrency').val();
		// var address = $('.searchinput').val().trim();
		var filterParams = {
			depth: depth,
			width: width,
			currency: currency
		}
		var account = {
			address: address.address,
			id: address.address,
			parent: "origin"
		};
        // AccountActions.accounttransactionstrack([account], params, filterParams);
    	this.setState({page:"report"});
    },

    _onRightId_fromInfosStore: function() {
    	var idcollection = RippleinfosStore.getSpecific("address1")["address1"];
    	var address = idcollection.infos;
  //       // AccountActions.viewready(idcollection,"address");
        AccountActions.accountTransactions(address);
        PaymentStore.cleanAll();
        var params = ParametersManagerConfig.transactiontrackingparams;
		var width = $('#selectWidth').val();
		var depth = $('#selectDepth').val();
		var currency = $('#selectCurrency').val();
		var address = $('.searchinput').val().trim();
		var filterParams = {
			depth: depth,
			width: width,
			currency: currency
		}
		var account = {
			address: address,
			id: address,
			parent: "origin"
		};
    	// console.log("IDCOLLUECTIONNNN",idcollection,address,"account",account,"filterparams",filterParams);
        AccountActions.accounttransactionstrack([account], params, filterParams);
    	this.setState({page:"report"});
    }

});

module.exports = App;