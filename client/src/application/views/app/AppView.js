var React = require('react');
var Dashboard = require('Dashboard');
var Searchbar = require('SearchbarAccount');
var Panel = require('react-bootstrap').Panel;
// account components
var RippleidStore =require('IdStore');
var RippleinfosStore = require('InfosStore');
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
    	if(this.state.page == "welcome") {
			var page =   
				<div id="bigsearch">
			      	<div className="expanded-panel">
			       		<div>
				         	<div>
					        	<Panel>
					        		<div>
					        			<img id="ripplelogo" src={'./img/Greenripple.png'}  />
					        			<p id="rippletitle" > Ledger Monitor </p>
					        		</div>
					        		<Searchbar/>
					    		</Panel>
					    	</div>
				    	</div>
				    </div>
				</div>;
		}

		if(this.state.page == "report") {
			var page = <Account searchbar={Searchbar} isvalid={true} />;
			// var page = <div> MEs couilles! </div>;
		}

        return (<div>{page}</div>);
    },

    _onRightId_fromIdStore: function() {
    	var idcollection = RippleidStore.getSpecific("address1")["address1"];
        AccountActions.viewready(idcollection,"id");
    	this.setState({page:"report"});
    },

    _onRightId_fromInfosStore: function() {
    	var idcollection = RippleinfosStore.getSpecific("address1")["address1"];
        AccountActions.viewready(idcollection,"address");
    	this.setState({page:"report"});
    }

});

module.exports = App;