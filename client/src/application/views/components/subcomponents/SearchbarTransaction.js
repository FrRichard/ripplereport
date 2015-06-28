var React = require('react');
var TransactionStore = require('TransactionStore');
var RippledataActions = require('DataActions');


var SearchBar = React.createClass({

	getInitialState: function() {
		var isloading;
		return {isloading: false};
	},

	componentDidMount: function() {
		TransactionStore.addChangeListener("transaction0",this._onChangeTransaction);
		// TransactionStore.addChangeListener("isloading"), this.isloading);
	},



	handleClick: function() {
		var self = this;
		this.setState({isloading:true});

		var input = $('#search input').val();
		console.log("input",input);
		var tx = {
			txhash:input
		};
		RippledataActions.transaction([tx]);

	},


	handleKeyPress: function(e) {
		if (e.which == 13) this.handleClick();
	},

	onFocusInput: function() {
		// $('.transaction_errormsg').remove();
	}, 

	render: function(){
		console.log("====================LOADSTATE================",this.state);
		if(!this.state.isloading) {
			var searchlogo = <i  onClick={this.handleClick}   className="fa fa-search searchbutton"></i>;
		} 
		if(this.state.isloading) {
			var searchlogo = <img className="loading_search"  src={'./img/loading2.gif'} />;
		}

		if(this.state.data) {
			if(this.state.isvalid == "success") {
				var searchlogo = <i id="searchvalidid" className="fa fa-check checkrightid"></i>;
			}

			if(this.state.isvalid == "error") {
				var searchlogo = <i id="searchwrongid" className="fa fa-times checkwrongid"></i>;
				var errormsg = <div className ="transaction_errormsg"> {this.state.data.message}</div>;
			}
		}

		return ( 
		<span>
			 <div id="search" className="search_transaction">
				<input onKeyPress={this.handleKeyPress} onFocus={this.onFocusInput} type="text"  placeholder="Enter transaction hash" className="searchinput"/>
				{searchlogo}
			</div>
			{errormsg}
		</span>
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