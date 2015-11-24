var React = require('react');
var TransactionStore = require('TransactionStore');
var RippledataActions = require('DataActions');
var Panel = require('react-bootstrap').Panel;


var SearchBar = React.createClass({

	getInitialState: function() {
		var isloading;
		return {isloading: false};
	},

	componentDidMount: function() {
		TransactionStore.addChangeListener("transaction0",this._onChangeTransaction);
	},



	handleClick: function() {
		var self = this;
		this.setState({isloading:true});

		var input = $('#search input').val();
		var tx = {
			txhash:input
		};
		RippledataActions.transaction([tx]);

	},


	handleKeyPress: function(e) {
		if (e.which == 13) this.handleClick();
	},

	onFocusInput: function() {
	}, 

	render: function(){
		if(!this.state.isloading) {
			var searchlogo = <i onClick={this.handleClick} className="fa fa-search searchbutton"></i>;
		} 
		if(this.state.isloading) {
			var searchlogo = <img className="loading_search"  src={'/img/loading2.gif'} />;
		}

		if(this.state.data) {
			if(this.state.isvalid == "success") {
				var searchlogo = <i id="searchvalidid" className="fa fa-check checkrightid"></i>;
			}

			if(this.state.isvalid == "error") {
				var searchlogo = <i onClick={this.handleClick} className="fa fa-search searchbutton"></i>;
				var errormsg = <div className ="errormsg"> {this.state.data.message}</div>;
			}
		}

		return ( 
		    <div id="search" className="search search_account">
				<input onKeyPress={this.handleKeyPress} type="text" placeholder="Enter transaction hash" className="searchinput"/>
				{searchlogo}
			    {errormsg}
			</div>
			)
	},

    _onChangeTransaction: function() {
    	var tx = TransactionStore.getSpecific("transaction0")["transaction0"];
    	this.setState({
    		isloading:false,
    		isvalid : tx.result,
    		data:tx
    	});
    }


});

module.exports = SearchBar;