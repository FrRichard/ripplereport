var React = require('react');
var transactionParser = require('ripple-lib-transactionparser');
var Table = require('react-bootstrap').Table;
var FormatUtils = require("FormatUtils");
var BigNumber = require("bignumber");
var AccountActions = require("AccountActions");
var IdStore = require("RippleidStore");
var rawJson = require("RawJson");


var Build = {

	offercreate: function(data, addresslist) {
		var self = this;
		var rawJson_factory = new rawJson();
		var parsedbalance = transactionParser.parseBalanceChanges(data.transaction.meta);
		var header = this.header(data);
		var memo = this.memo(data);


		////////////////////////////////////////////////////////////////GATEWAYS PART///////////////////////////////////////////////////////////////////////////////////
		var gateways= [];
		if(_.isObject(data.transaction.tx.TakerPays)) {
			gateways.push(data.transaction.tx.TakerPays.issuer);
		}
		if(_.isObject(data.transaction.tx.TakerGets)) {
			gateways.push(data.transaction.tx.TakerGets.issuer);
		}

		var allgateway_tab = [];
		var otheraccounts_lines = [];
		var addresslist = addresslist;
		if(addresslist == undefined ) {
			addresslist = [];
		}

		_.each(parsedbalance, function(balance, address) {

			var gateway = _.find(gateways, function(g) {
				return address == g;
			});
			if(gateway) {
				var total_debit = {}; 
				var total_credit = {};
				var lines = [];
				_.each(balance, function(b) {
						if(!total_credit[b.currency]) {
							total_credit[b.currency] = 0;
						}
						if(!total_debit[b.currency]) {
							total_debit[b.currency] = 0;
						}
						if(b.value < 0) {
							var debit = Math.abs(b.value);
							var credit = "";
							var debit_currency = b.currency;
							total_debit[b.currency] += debit;
						} else {
							var debit = "";
							var credit = Math.abs(b.value);
							var credit_currency = b.currency;
							total_credit[b.currency] += credit;
						}

						var line = 
							<tr>
								<td> {addresslist[b.counterparty]} &nbsp;<a href={"/app?"+JSON.stringify(self.formataddress(b.counterparty))} target="_blank" value={b.counterparty}> {b.counterparty} </a> </td>
								<td className="buy"> {debit} {debit_currency} </td>
								<td className="sell"> {credit} {credit_currency} </td>
							</tr>;
						lines.push(line);
				});
				

				var total = [];
				var gateways_fee = [];

				_.each(total_debit, function(debit, currency) {
					var t = <tr>
							<td>Total {currency}</td>
							<td className="buy"> {debit} </td>
							<td className="sell"> {total_credit[currency]} </td>
						</tr>;
					total.push(t);

					var fee = Number(((total_debit[currency] - total_credit[currency])/total_debit[currency]*100).toFixed(3));

					var gateway_fee = <tr>
						<td>Gateway fees {currency}</td>
						<td className="exchange"> {Math.abs(fee)}% </td>
						<td> (total_debit-total_credit)/total_debit*100 </td>
				 	</tr>;

				 	gateways_fee.push(gateway_fee);
				});


				var network_fee = <tr>
					<td>Network fees</td>
					<td className="exchange"> {data.transaction.tx.Fee/Math.pow(10,6)} XRP </td>
					<td > </td>
				</tr>;


				// bignumber needed to calculte fees ?			
				// var fee = Number(((total_debit[currency] - total_credit[currency])/total_debit[currency]*100).toFixed(3));

				// var gateway_fee = <tr>
				// 					<td>Gateway fees</td>
				// 					<td className="exchange"> {fee}% </td>
				// 					<td> (total_debit-total_credit)/total_debit*100 </td>
				// 			 	</tr>;


				var gateway_tab = 
					<table className="pure-table pure-table-striped transaction_table_gateway">
					 	<thead>
							<tr>
								<th></th>
								<th colSpan="2">
									{addresslist[gateway]} 
									<a href={"/app?"+JSON.stringify(self.formataddress(gateway))} target="_blank" value={gateway}>&nbsp; {gateway}</a>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td></td>
								<td> Debit </td>
								<td> Credit </td>
							</tr>
							{lines}
							{total} 
							<tr>
								<td className="transaction_field_title"> </td>
								<td className="transaction_field_title"> Fees </td>
								<td className="transaction_field_title"> Calculation Method </td>
							</tr>
							{network_fee}
							{gateways_fee}
						</tbody>

					</table>;
				allgateway_tab.push(gateway_tab);
			} else {
			////////////////////////////////////////////////////////////////////: OTHER ACCOUNTS PART ///////////////////////////////////////////////////////////////////

				var otheraccounts_changes = [];

				_.each(balance, function(b) {
					if(b.value >= 0) {
						var color = "buy";
						var sign = "+";
					} else {
						var color = "sell";
						var sign = "";
					}
					var result = 
						<span className={color}><span> {sign} {b.value} <span className="currency_floatright">{b.currency}</span>   </span><br/></span>
					;
					otheraccounts_changes.push(result);
				});
									
				otheraccounts_lines.push(
						<tr>
							<td> 
								{addresslist[address]} 
								<a className="transaction_reducedaddress" href={"/app?"+JSON.stringify(self.formataddress(address))} target="_blank" value={address}>&nbsp; {address}</a>
							</td>
							<td> {otheraccounts_changes} </td>
						</tr>);

			}
		});


		var gateways = 
			<div className="panel panel-default transaction_gateways">
		        <div className="panel-heading clearfix">
		          <div className="panel-title  pull-left transaction_header_title" onMouseOver="" onMouseOut="">
		            <i className=""></i>
		            <span className="panel-title-text">Gateways Line Changes</span>
		          </div>
		        </div>
	    		<div className="panel-body" >
	    			{allgateway_tab}
				</div>
			</div>;


		//////////////////////////////////////////////////////////////////////////////////////TERM OF EXCHANGE PART/////////////////////////////////////////////////////////////
		var account = data.transaction.tx.Account;
		var address = this.formataddress(account);

		if(_.isObject(data.transaction.tx.TakerGets)) {
			var exchange = data.transaction.tx.TakerGets.value;
			var exchange_currency = data.transaction.tx.TakerGets.currency;
			var exchange_issuer = data.transaction.tx.TakerGets.issuer;
		} else {
			var exchange = data.transaction.tx.TakerGets/Math.pow(10,6);
			var exchange_currency = "XRP";
			var exchange_issuer = "";
		}
		if(_.isObject(data.transaction.tx.TakerPays)) {
			var against = data.transaction.tx.TakerPays.value;
			var against_currency = data.transaction.tx.TakerPays.currency;
			var against_issuer = data.transaction.tx.TakerPays.issuer;
		} else {
			var against = data.transaction.tx.TakerPays/Math.pow(10,6);
			var against_currency = "XRP";
			var against_issuer = "";
		}

		var termsoftrade = 	
			<div className="panel panel-default transaction_termsoftrade">
		        <div className="panel-heading clearfix">
		          <div className="panel-title  pull-left transaction_header_title" onMouseOver="" onMouseOut="">
		            <i className=""></i>
		            <span className="panel-title-text">Terms of trade</span>
		          </div>
		        </div>
	    		<div className="panel-body" >
	    			<div className="transaction_tod_block">  
	    				<span >
	    					<a href={"/app?"+JSON.stringify(address)} target="_blank" value={account}>{account}</a>   created this offer 
	    				</span>
	    				 
	    				<span className="transaction_account">  ({addresslist[account]}).  </span>
	    				
	    			</div>
	    			<div className="transaction_tod_block">
	    				 <span className="transaction_field_medium">Exchange: </span> {exchange} {exchange_currency} 
	    				 <br/> <span className="transaction_tod_block_issuer">
	    				 			Issuer: {addresslist[exchange_issuer]} &nbsp; <a href={"/app?"+JSON.stringify(this.formataddress(exchange_issuer))} target="_blank" value={exchange_issuer}> {exchange_issuer} </a>
	    				 		</span>
	    			</div>
	    			<div className="transaction_tod_block"> 
	    				<span className="transaction_field_medium_black"> Against: </span> {against}  {against_currency} 
	    				<br/> <span className="transaction_tod_block_issuer">
	    						 Issuer: {addresslist[against_issuer]} &nbsp; <a href={"/app?"+JSON.stringify(this.formataddress(against_issuer))} target="_blank" value={against_issuer}>  {against_issuer} </a>
	    					  </span>
	    			</div>
	    			<div>
	    				This account offered {exchange_currency} in exchange of {against_currency}
	    			</div>
				</div>
			</div>;

		var otheraccounts_tab = 
						<table className="pure-table pure-table-striped transaction_otheraccounts_table">
						 	<thead>
								<tr>
									<th> Account </th>
									<th> Balance changes</th>
								</tr>
							</thead>
							<tbody>
								{otheraccounts_lines}
							</tbody>

						</table>;

		var otheraccounts = 	
					<div className="panel panel-default transaction_otheraccounts">
				        <div className="panel-heading clearfix">
				          <div className="panel-title  pull-left transaction_header_title" onMouseOver="" onMouseOut="">
				            <i className=""></i>
				            <span className="panel-title-text">Accounts balance changes</span>
				          </div>
				        </div>
			    		<div className="panel-body" >
			    			{otheraccounts_tab}
			    		</div>
			    	</div>;

		////////////////////////////////////////////////////////////////////////////////////// RAW JSON SUBVIEW//////////////////////////////////////////////////////////////////
		var rawJson_params = {
			height: "26.2em",
			width: "49.75%",
			title: "Raw data"
		}
		var rawJson_view = rawJson_factory.createView(rawJson_params);
		

		return (
			<div id="txdata"> 
				<div>
					{header}
					{memo}
				</div>
				<div>
					{termsoftrade}
					{gateways}
					{otheraccounts}
					{rawJson_view}
				</div>
			</div>
		);







	},

	offercancel: function(data) {

	},

	payment: function(data) {

	},

	accountset: function(data) {

	},

	setregularkey: function(data) {

	},

	trustset: function(data) {

	},

	simple: function(data) {
		var header = this.header(data);
		var memo = this.memo(data);
		var rawJson_factory = new rawJson();
		var rawJson_params = {
			height: "26.2em",
			width: "59.75%",
			title: "Raw data",
			float:"left",
			marginLeft: "10%"
		}
		var rawJson_view = rawJson_factory.createView(rawJson_params);

		return (
			<div id="txdata"> 
				<div>
					{header}
					{memo}
					{rawJson_view}
				</div>
			</div>
		);

	},

	header: function(data) {
		var date = data.transaction.date;
		var transactiontype = data.transaction.tx.TransactionType;
		var ledger_index = data.transaction.ledger_index;
		var hash = data.transaction.hash;
		var signingpubkey = data.transaction.tx.SigningPubKey;
		var txsignature = data.transaction.tx.TxnSignature;
		//<div> <span className='transaction_field'>TxSignature: </span> {txsignature} </div>
		return (<div className="panel panel-default transaction_header">
	        <div className="panel-heading clearfix">
	          <div className="panel-title  pull-left transaction_header_title" onMouseOver="" onMouseOut="">
	            <i className=""></i>
	            <span className="panel-title-text transaction_field_special  ">  {transactiontype} </span>
	          </div>
	        </div>
    		<div className="panel-body" >
    			<div className="transaction_field_special"> <span className='transaction_field'>TransactionType: </span> {transactiontype} </div>
    			<div> <span className='transaction_field'>Date: </span> {date} </div>
    			<div> <span className='transaction_field'>LedgerIndex: </span> {ledger_index} </div>
    			<div> <span className='transaction_field'>TxHash: </span> {hash} </div>
    			<div> <span className='transaction_field'>SigningPubKey: </span> {signingpubkey} </div>
			</div>
		</div>);
	},

	memo: function(data) {
		if(data.transaction.tx.Memos[0].Memo) {
			var format = data.transaction.tx.Memos[0].Memo.parsed_memo_format;
			var type =data.transaction.tx.Memos[0].Memo.parsed_memo_type;
		} else {
			var format = "";
			var type = "";
		}

		return (<div className="panel panel-default transaction_memo">
	        <div className="panel-heading clearfix">
	          <div className="panel-title  pull-left transaction_header_title" onMouseOver="" onMouseOut="">
	            <i className=""></i>
	            <span className="panel-title-text">Memo</span>
	          </div>
	        </div>
    		<div className="panel-body" >
    			<div> <span className='transaction_field'>Type: </span> {type} </div>
    			<div> <span className='transaction_field'>Format: </span> {format} </div>
			</div>
		</div>);
	},

	formataddress: function(address) {
		return { address:address};
	}

};


module.exports = Build;