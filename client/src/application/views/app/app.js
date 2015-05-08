var React = require('react');
var Dashboard = require('Dashboard');
var Searchbar = require('Searchbar_account');
var Panel = require('react-bootstrap').Panel;
// account components
var RippleidStore =require('RippleidStore');
var RippleinfosStore = require('RippleinfosStore');
var Account = require('Account');
var AccountActions = require('AccountActions');

var titlestyle = {
	marginLeft:10 +"%", 
	fontSize: 35+"px" ,

};

var logostyle = {
	height:40+"px",
	marginLeft:3+ '%',
	marginTop:0.5 +'%'
};

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
				<div id="bigsearch" style={{marginLeft: 'auto', marginRight:'auto',marginTop:15+"%"}}>
			      	<div className="container-fluid expanded-panel">
			       		<div className="row">
				         	<div id="top-panel" >
						        	<Panel  style={{height: 130 }} >
						        		<div>
						        			<img id="ripplelogo" src={'./img/Greenripple.png'}  style={logostyle}/>
						        			<p id="rippletitle" style={titlestyle}> Ripple Report </p>
						        		</div>
						        		<Searchbar origine={"APP!"}/>
						    		</Panel>
					    	</div>
				    	</div>
				    </div>
				</div>;
		}

		if(this.state.page == "report") {
			var page = <Account searchbar={Searchbar}/>;
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