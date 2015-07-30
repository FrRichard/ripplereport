var React = require('react');
//store
var RippleaccounttransactionsStore = require('AccountTransactionsStore');
//actions
var AccountActions = require('AccountActions');
var PollingActions = require('PollingActions');
//charts
// var LineChart = require('barchart2');
var PieChart = require('PieChartBigNumber_react');
//css
var viewcommon = require('ViewCommon');
//helper
var moment = require("moment");
var datahelper = require('DataHelper');
var FormatUtils = require("FormatUtils");
var Table = require('reactabular').Table;
var Search = require('reactabular').Search;
var Paginator = require('react-pagify');
require('react-pagify/style.css');
var table_funct = require('TableFunct');





function getRippleaccounttransactionsState(key) {
	var rippleaccounttransactions= RippleaccounttransactionsStore.getSpecific(key);
	return {
		id: new Date().getTime(),
		rippleaccounttransactions:rippleaccounttransactions
	}
}



var RippleAccountTransactions = React.createClass({

	getInitialState: function() {
		var self = this;
	
		this.address= "address" + this.props.attributes.reportnumber;
		if(getRippleaccounttransactionsState(this.address)) {
			var rippleaccounttransactions = getRippleaccounttransactionsState(this.address).rippleaccounttransactions;
		} else {
			var rippleaccounttransactions={};
		}

		isloading = true;
		loadingstatus = {
		 	msg:"Initialize request ..."
		}

		var pagination = {
		    page: 0,
		    perPage: 6
		};

		var search = {
            column: '',
            data: [],
            query: ''
        };

		var data = [];

		var columns = [
		    {
		        property: 'time',
		        header: 'Date',
		       	cell: (time) => {
		       		return {
		       			value:<div>{moment(time).format('MMMM Do YYYY, h:mm:ss a')}</div>		
		       		}
		       	},
		       	search: (time) => moment(time).format('MMMM Do YYYY, h:mm:ss a')
		    },
		    {
		        property: 'currency',
		        header: 'Currency',
		        search: (currency) => currency
		    },
			{
				property:'amount',
				header: 'Amount',
				cell: (amount) => FormatUtils.formatValue(amount),
				search: (amount) => amount
			},
		    {
		        property: 'type',
		        header: 'Type',
		        search: (type) => type
		    },
		    {
		        property: 'direction',
		        header: 'Direction',
		        cell: (direction) => {
		        	if(direction == "standard") {
		        		return {
		        			value: <div style={{color:'#124A51'}}> {direction} </div>
		        		}
		        	} else if(direction == "cashout") {
		        		return {
		        			value: <div style={{color:'#b01e2e'}}> {direction} </div>
		        		}
		        	} else {
		        		return {
		        			value: <div style={{color:'#339933'}}> {direction} </div>
		        		}
		        	}
		        },
		        search: (direction) => direction
		    },
		    {
		        header: ' ',
		        cell: (value, celldata, rowIndex, property) => {

		            var collapse = table_funct.collapsable;
		            // var details = collapse.details;
		            // var button;
		            var issuer = { address:celldata[rowIndex].hiddenprops.issuer };
		            var counterparty = { address:celldata[rowIndex].hiddenprops.counterparty };
		            var txhash = { txhash:celldata[rowIndex].hiddenprops.txHash };
		            var ledgerindex = { ledgerindex:celldata[rowIndex].hiddenprops.ledgerIndex };
		            // !collapse.iscollapsed ?  button = "fa fa-chevron-down" :  button = ""; 
		    		var content = "<tr>" +
		    			" <td style='max-width:0px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;'> <span> LedgerIndex: <a href=/app?"+JSON.stringify(ledgerindex)+" target='_blank'>" + celldata[rowIndex].hiddenprops.ledgerIndex +"</a> </span>" +
		    			"</br><span > TxHash: <a href=/transaction?"+JSON.stringify(txhash)+" target='_blank'>  " + celldata[rowIndex].hiddenprops.txHash +" </a> </span></td>" + 
		    			"<td  style='max-width:0px; white-space:nowrap; border:0px;' ><span> Issuer: <a href=/app?"+JSON.stringify(issuer)+" target='_blank'>  " + celldata[rowIndex].hiddenprops.issuer +" </a> </span>" + 
		    			"</br><span> Counterparty: <a href=/app?"+JSON.stringify(counterparty)+" target='_blank'>  " + celldata[rowIndex].hiddenprops.counterparty +" </a> </span></td>" + 
		    			"</tr>";
		            var handler = function(e) {
		            	return function(e) {
		            		collapse(e,content);
		            	}(e);
		            }

		            return {
		                value: <span>
		                    <i onClick={handler} className="fa fa-chevron-down transactiondetailbutton" style={{cursor: 'pointer'}}></i>
		                </span>
		            };
		        }
		    }
	    
		];
		return { rippleaccounttransactions:rippleaccounttransactions, isloading:isloading, loadingstatus:loadingstatus, data:data, columns:columns, pagination:pagination, search:search};
	},


	componentWillMount: function() {

	},

	componentDidMount: function() {
		
		var key = this.props.attributes.reportnumber;
		var address = "address" + key;
		//Listener
		RippleaccounttransactionsStore.addChangeListener('isloading', this._onLoading);
		RippleaccounttransactionsStore.addChangeListener('loadingstatus', this._onLoadingStatus);
		RippleaccounttransactionsStore.addChangeListener(address, this._onChangeRippleaccounttransactions);
		// instanciate stuff
		this.DataHelper = new datahelper();

	},

	componentWillUnmount: function() {
		RippleaccounttransactionsStore.removeChangeListener(this._onChangeRippleaccounttransactions);
	},

	componentDidUpdate: function() {
		
	},

	render: function() {
			// console.log("STATE:",this.state);
			var self =this;
			this.address= "address" + this.props.attributes.reportnumber;
			var panelstyle = viewcommon.linechart;
			var AllPies = [];

	        var filteredData = Search.search(
			    this.state.search,
			    this.state.columns,
			    this.state.data
			);
			var paginated = Paginator.paginate(filteredData, this.state.pagination);
			var header = table_funct.header.call(this, this.state.columns, this.state.data);

			if(this.state.rippleaccounttransactions[this.address]) {
				if(this.state.rippleaccounttransactions[this.address].transactions) {
					var transactions = this.state.rippleaccounttransactions[this.address];
					var totalcashs = transactions.summary.totalcash;
					_.each(totalcashs, function(totalcash,key) {
						var todraw = self.DataHelper.PieChart_bignumber(totalcash);
						var currencyimgsrc =FormatUtils.formatCurrencyLabel(key).image;
			      		var currencyimg = <img key={"currencyimg"+key} className="currencyimgoverview" src={currencyimgsrc}/> 
						if(todraw.length>0) {
							if(todraw[0].amount > 0 || todraw[1].amount > 0) {
								AllPies.push(
									<div key={"smallpie"+key} className="transactionsmallpie">
										<div key={"transactioncurrencytitle"+key} className="transactioncurrencytitle">
											{currencyimg} &nbsp;
											{key} 
										</div>
										<PieChart id={"Cashinout_"+key} size={[100,100]} data={todraw} />
										<div className="totalcashinoutt">
											<span key= {"cashin"+key} className="totalcashin">Cash In: {FormatUtils.formatValue(totalcash.cashin)} </span><br/>
											<span key ={"cashout" +key} className="totalcashout">Cash Out: {FormatUtils.formatValue(totalcash.cashout)} </span><br/>
											<span key={"standard"+key} className="totalstandard">Standard: {FormatUtils.formatValue(totalcash.standard)} </span>
										</div>
									</div>
								);
							}
						}
					});
				}
				if(transactions) {
					var fromto = <div className="paymentTimePeriod">
									<span> From: {moment(transactions.startTime).format('MMMM Do YYYY, h:mm:ss a')} </span> <br/>
									<span> To: {moment(transactions.endTime).format('MMMM Do YYYY, h:mm:ss a')} </span>
								</div>;
				} else {
					var fromto =  <div className="paymentTimePeriod">
									<span> From:  </span> <br/>
									<span> To: </span>
								</div>;
				}
				var timeController = 
							<div className="paymentTimeControllerBlock"> 
								{fromto}
								<select onChange={this.selectTimePeriod} className="paymentTimeController" value={this.state.period}> 
									<option value={"tx"}> Last 1000 transactions </option>
									<option value={"3"}> 3 days </option>
									<option value={"10"}> 10 days </option>
									<option value={"30"}> 30 days </option>
									<option value={"90"}> 90 days </option>
									<option value={"all"}> All </option>
								</select>
							</div>;
			}

			if(this.state.rippleaccounttransactions[this.address]) {
				var formatedtransactions =  this.DataHelper.transactionsGriddle(this.state.rippleaccounttransactions[this.address].transactions);
			}

		return ( 
			<div className="panel panel-default">
				 <div className="panel-heading clearfix">
					 <div className="panel-title  pull-left" onMouseOver="" onMouseOut="">
	             		<i className={this.props.attributes.icon}></i>
						<span className="panel-title-text">
							{this.props.attributes.title}
						</span>
           			</div>
           		</div>
			    {timeController}
           		{ this.state.isloading ?  <div>
           			<img className="loading" src={'./img/loading2.gif'} /> 
           			<div className='loadingstatus'>{this.state.loadingstatus.msg} </div>
           			<div className='loadingstatus_date1'>From:{this.state.loadingstatus.from}</div> 
           			<div className='loadingstatus_date2'>To:{this.state.loadingstatus.to} </div>   
           			{this.state.uuid ?
           				<button onClick={this.stopFetching} className="loadingbuttonstop"> Stop fetching at this date </button> 
           			: ''}
           		</div> : ''}
           		{ !this.state.isloading ?
           			this.state.rippleaccounttransactions[this.address] ?
           				this.state.rippleaccounttransactions[this.address].transactions ?
	           				this.state.rippleaccounttransactions[this.address].transactions.length > 0 ?
				           		<div className="panel-body" style={panelstyle}>
				           			<div className="allsmallpie">
					           			<h4 className="maintitleminipie"> Payment Sum and Directions </h4>
				           		 		{AllPies}
				           		 	</div>
				           		 	<div className="alltransactionss">
					           			<div className='search-container'>
										    Search <Search ref={'search'} columns={this.state.columns} onChange={this.setState.bind(this)}></Search>
										</div>
				
					           			<Table className="pure-table layoutfixed" columns={this.state.columns} data={paginated.data} header={header}/>

					           		 	<div className='pagination'>
										    <Paginator
										        page={paginated.page}
										        pages={paginated.amount}
										        beginPages={3}
										        endPages={3}
										        onSelect={this.onSelect}></Paginator>
										</div>
				           		 	</div>
								</div>
							:  <div className="didntissueiou"> This account didnt make any payment </div> 
						: <div className="didntissueiou"> This account didnt make any payment for this period</div> 
					: ""
				: ""}

			</div>);

	},

	_onLoading: function() {
		this.setState({
			isloading:true
		});
    },

    _onLoadingStatus: function() {
    	var loadingstatus = getRippleaccounttransactionsState('status').rippleaccounttransactions.status;
    	var msg = loadingstatus.msg;

    	if(loadingstatus.date) {
    		var period = loadingstatus.date;
    		var from = moment(period.from).format('YYYY-MM-DD h:mm:ss a');
    		var to = moment(period.to).format('YYYY-MM-DD h:mm:ss a');
    	} else {
    		var from = '';
    		var to = '';
    	}
    	var uuid = loadingstatus.uuid;

		if(uuid != this.state.uuid ) {
			// console.log("account has changed!!",this.state,uuid,this.state.uuid);
			this.stopFetching();
		}
    	this.setState({
    		loadingstatus: {
    			msg: msg,
    			from: from,
    			to: to
    		},
    		uuid: uuid
    	});
   	},

	_onChangeRippleaccounttransactions: function() {
		var self = this;
		var key = this.props.attributes.reportnumber;
		this.address= "address" + key;
		var isloading = false;
		var rippleaccounttransactions = getRippleaccounttransactionsState("address" + key).rippleaccounttransactions;
		var data = table_funct.filldata(rippleaccounttransactions[this.address].transactions, ["amount", "time", "direction", "type", "currency"], ["issuer", "counterparty", "txHash", "ledgerIndex"]);
		if(rippleaccounttransactions[self.address].account) {
			var account = rippleaccounttransactions[self.address].account;
		} else {
			var account = this.state.account;
		}
		if(rippleaccounttransactions[this.address].period) {
			var period = rippleaccounttransactions[this.address].period;
		} else {
			var period = this.state.period;
		}
		this.setState({
			rippleaccounttransactions: rippleaccounttransactions,
			data:data,
			isloading: isloading,
			search: {
	            column: '',
	            data: data,
	            query: ''
	        },
	        account: account,
	        period:period
		});
		$('.transactiondetailbutton').parents('td').addClass('transactiondetailbutton');
	},

	onSelect: function(page) {
	    var pagination = this.state.pagination || {};

	    pagination.page = page;

	    this.setState({
	        pagination: pagination
	    });
	},

	onPerPage: function(e) {
	    var pagination = this.state.pagination || {};

	    pagination.perPage = parseInt(event.target.value, 6);

	    this.setState({
	        pagination: pagination
	    });
	},

	onSearch: function(search) {

        this.setState({
            search: search
        });
    },

    selectTimePeriod: function(e) {
    	var days = e.target.value;
    	this.setState({
    		period: days,
    		status: "Transactions are fetching...",
    		uuid: false
    	});
    	var account = { 
    		address: this.state.account,
    		id:this.address
    	};
    	var params = {
	            limit:1000,
	            offset: 0,
	            type:"Payment",
	            period:days
		};
		if(days !="all" & days !="tx") {
			params['start'] = moment().subtract(days,'days').format('YYYY-MM-DDThh:mm');
		}

    	AccountActions.accountTransactions([account],params);
    	// console.log(account,params);
    },

    stopFetching: function() {
    	// console.log("stat buttton",this.state);
    	PollingActions.stopTransactionRequest(this.state.uuid);
    }


});

module.exports = RippleAccountTransactions;