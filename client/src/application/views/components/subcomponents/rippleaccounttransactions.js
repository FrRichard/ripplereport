var React = require('react');
var RippleaccounttransactionsStore = require('RippleaccounttransactionsStore');
//charts
// var LineChart = require('barchart2');
var PieChart = require('pieChart_bignumber_react');
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
var table_funct = require('table_funct');




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
		    			"</br><span > TxHash: <a href=/app?"+JSON.stringify(txhash)+" target='_blank'>  " + celldata[rowIndex].hiddenprops.txHash +" </a> </span></td>" + 
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
		return { rippleaccounttransactions:rippleaccounttransactions, isloading:isloading, data:data, columns:columns, pagination:pagination, search:search};
	},


	componentWillMount: function() {

	},

	componentDidMount: function() {
		var key = this.props.attributes.reportnumber;
		var address = "address" + key;
		//Listener
		RippleaccounttransactionsStore.addChangeListener('isloading', this._onLoading);
		RippleaccounttransactionsStore.addChangeListener(address, this._onChangeRippleaccounttransactions);
		// instanciate stuff
		this.DataHelper = new datahelper();

	},

	componentWillUnmount: function() {
		RippleaccounttransactionsStore.removeChangeListener(this._onChangeRippleaccounttransactions);
	},

	render: function() {
			var self =this;
			this.address= "address" + this.props.attributes.reportnumber;
			var panelstyle = viewcommon.linechart;

			this.chartId= "Overviewcapitalization" +this.props.attributes.key;

			var AllPies = [];

	        var filteredData = Search.search(
			    this.state.search,
			    this.state.columns,
			    this.state.data
			);
			var paginated = Paginator.paginate(filteredData, this.state.pagination);
			var header = table_funct.header.call(this, this.state.columns, this.state.data);

			if(this.state.rippleaccounttransactions[this.address]) {
				var totalcashs = this.state.rippleaccounttransactions[this.address].summary.totalcash;
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

			if(this.state.rippleaccounttransactions[this.address]) {
				var formatedtransactions =  this.DataHelper.transactionsGriddle(this.state.rippleaccounttransactions[this.address].transactions);
			}

				           			// <h4 className="maintitlealltransactions "> All Payments </h4>
				     //       			<div className='per-page-container'>
									//     Per page <input type='text' defaultValue={this.state.pagination.perPage} onChange={this.onPerPage}></input>
									// </div>
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
           		{ this.state.isloading ?  <div><img className="loading" src={'./img/loading2.gif'} /></div> : ''}
           		{ !this.state.isloading ?
           			this.state.rippleaccounttransactions[this.address] ?
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
					: ""
				: ""}

			</div>);

	},

	_onLoading: function() {
		this.setState({
			isloading:true
		});
    },

	_onChangeRippleaccounttransactions: function() {
		var key = this.props.attributes.reportnumber;
		this.address= "address" + key;
		var isloading = false;
		var rippleaccounttransactions = getRippleaccounttransactionsState("address" + key).rippleaccounttransactions;
		var data = table_funct.filldata(rippleaccounttransactions[this.address].transactions, ["amount", "time", "direction", "type", "currency"], ["issuer", "counterparty", "txHash", "ledgerIndex"]);

		this.setState({
			rippleaccounttransactions: rippleaccounttransactions,
			data:data,
			isloading: isloading,
			search: {
	            column: '',
	            data: data,
	            query: ''
	        }
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
    }


});

module.exports = RippleAccountTransactions;