var React = require('react');
var ChartEngine = require('ChartEngine');
var Topbar = require('Topbar');
var SideMenu = require('SideMenu');
var Footer = require('Footer');
var Dashboard = require('Dashboard');
var Searchbar = require('Searchbar_account');
var Panel = require('react-bootstrap').Panel;
// <AppRouter />

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
    render: function() {
        return (
        <div id="bigsearch" style={{marginLeft: 'auto', marginRight:'auto',marginTop:15+"%"}}>
	      	<div className="container-fluid expanded-panel">
	       		<div className="row">
		         	<div id="top-panel" >
				        	<Panel  style={{height: 130 }} >
				        		<div>
				        			<img id="ripplelogo" src={'./img/Greenripple.png'}  style={logostyle}/>
				        			<p id="rippletitle" style={titlestyle}> Ripple Report </p>
				        		</div>
				        		<Searchbar />
				    		</Panel>
			    	</div>
		    	</div>
		    </div>
		</div>
    	)
    }	
});

module.exports = App;