var React = require('react');
var RippleaccounttransactionsStore = require('RippleaccounttransactionsStore');
//charts
// var LineChart = require('barchart2');
var PieChart = require('pieChart_bignumber_react');
//css
var viewcommon = require('ViewCommon');
//helper
var datahelper = require('DataHelper');
var FormatUtils = require("FormatUtils");
var Table = require('reactabular').Table;

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

	var data = [
//     {
//         nome: 'React.js',
//         type: 'library',
//         description: 'Awesome library for handling view.',
//     	test: "a",
//         followers: 23252,
//         hidden: { 
//         	nome:"here are some hidden details!!!",
//         	type: "hidden"
//         },
//         worksWithReactabular: true
//     },
//     {
//         nome: 'Angular.js',
//         type: 'framework',
//         description: 'Swiss-knife of frameworks. Kitchen sink not included.',
//     	test: 'b',
//         followers: 35159,
//         hidden: { 
//         	nome:"WOW such details!!!",
//         	type: "hidden"
//          },
//         worksWithReactabular: true
//     },
//     {
//         nome: 'Aurelia',
//         type: 'framework',
//         description: 'Framework for the next generation.',
//     	test: 'c',
//         followers: 229.12365497,
//         hidden: { 
//         	nome: "HERE SOME DETAILS !!!",
//         	type: "hidden"
//         },
//         worksWithReactabular: true
//     }
];

var columns = [
    {
        property: 'time',
        header: 'Date',
       	cell: (nome) => <div className="hiddencell">{nome}</div>		
    },
    {
        property: 'currency',
        header: 'Currency'
    },
	{
		property:'amount',
		header: 'Amount',
		cell: (amount) => FormatUtils.formatValue(amount)
	},
    {
        property: 'type',
        header: 'Type'
    },
    {
        property: 'direction',
        header: 'Direction',
        //cell: (followers) => FormatUtils.formatValue(followers)
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
    			"<td  style='max-width:0px; white-space:nowrap;' ><span> Issuer: <a href=/app?"+JSON.stringify(issuer)+" target='_blank'>  " + celldata[rowIndex].hiddenprops.issuer +" </a> </span>" + 
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
		return { rippleaccounttransactions:rippleaccounttransactions, isloading:isloading, data:data, columns:columns};
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
		// console.log("TRANSACTIONSTAAAAAAAAAAAAAAAATE",this.state);
	
		//table functions
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
				           			<h4 className="maintitlealltransactions "> All Payments </h4>
				           			<div className="griddletransactionss">
				           				<Table className="pure-table layoutfixed" columns={this.state.columns} data={this.state.data} header={header}/>
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
		console.log("data",data);
		this.setState({
			rippleaccounttransactions: rippleaccounttransactions,
			data:data,
			isloading: isloading
		});
				$('.transactiondetailbutton').parents('td').addClass('transactiondetailbutton');
	}


});

module.exports = RippleAccountTransactions;