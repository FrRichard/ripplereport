var React = require('react');
var ExchangeStore = require('ExchangeStore');
var Table = require('react-bootstrap').Table;
var FormatUtils = require("FormatUtils");


var Exchanges = React.createClass({

	getInitialState: function() {
		var result = {
			isloading: true
		};
		return result;
	},

	render: function() {
		if(!this.state.isloading) {
			var rows = this.computeRows();
		} 

		return (
			 <div className="panel panel-default grid-stack-item-content">
          <div className="panel-heading clearfix">
            <div className="panel-title  pull-left" onMouseOver="" onMouseOut="">
              <i className={this.props.attributes.icon}></i>
              <span>
              	<span className="panel-title-text">
                  {this.props.attributes.title} &nbsp;
                </span>
                <span className="title-name">
                  Last 200payments &nbsp; 
                </span>
              </span>
            </div>
          </div>
          <div className="panel-body exchanges balancetable " >
              { this.state.isloading ?  <div><img className="loading" src={'/img/loading2.gif'} /></div> : ''}
                { !this.state.isloading ?
              <Table striped bordered condensed hover>
                    <thead>
                      <th> Base Currency/Amount </th>
                      <th> Base Issuer </th>
                      <th> Counter Currency/Amount</th>
                      <th> Counter Issuer </th>
                      <th> Rate </th>
                      <th className="pymnttxhash"> Buyer </th>
                      <th className="pymnttxhash"> Seller </th>
                      <th className="pymnttxhash"> Tx Hash </th>
                    </thead>     
                    <tbody>
                  		{rows}
                    </tbody>
              </Table>
              : "" }
          </div>
        </div>

		)
	},

	componentDidMount: function() {
		ExchangeStore.addChangeListener('change',this._onChange);
		ExchangeStore.addChangeListener('isloading', this._onLoading);
	},

	_onChange: function() {
    var result = ExchangeStore.getAll();
    result['isloading'] = false;
		this.setState(result);
	},

	 _onLoading: function() {
  		this.setState({
  			isloading:true
  		});
    },

    computeRows: function() {
    	var self = this;
    	var rows = [];
    	if(this.state.exchanges.length > 0) {
    		this.state.exchanges.reverse();
    		_.each(this.state.exchanges, function(trade, i ) {
    			if(trade.seller == self.state[0].address && trade.base_currency != "XRP") {
    				var type = "received";
    			} else {
    				var type = "sent";
    			}
    			rows.push(
	    			<tr key={"paymenttable"+(i+1)} className= {type} >       
              <td key={"tradebasecurrency"+(i+1)}>  { trade['base_currency'] + ' ' + FormatUtils.formatValue(trade['base_amount'])} </td>
              <td className="balancetable_address" key={"tradebaseissuer"+(i+1)}> <a href={"/app/" + trade["base_issuer"]} target="_blank"> { trade["base_issuer"] } </a> </td>
              <td key={"tradecountercurrency"+(i+1)}>  {trade['counter_currency'] +' ' + FormatUtils.formatValue(trade['counter_amount'])} </td>
              <td className="balancetable_address" key={"tradecounterissuer"+(i+1)}> <a href={"/app/" + trade["counter_issuer"]} target="_blank"> { trade["counter_issuer"] } </a> </td>
              <td key={'traderate' +(i+1)}> {FormatUtils.formatValue(trade['rate'])} </td>
              <td className="balancetable_address pymnttxhash" key={"tradebuyer"+(i+1)}> <a href={"/app/" + trade["buyer"]} target="_blank"> { trade["buyer"] } </a> </td>
              <td className="balancetable_address pymnttxhash" key={"tradeseller"+(i+1)}> <a href={"/app/" + trade["seller"]} target="_blank"> { trade["seller"] } </a> </td>
              <td className="balancetable_address pymnttxhash" key={"tradetxhash"+(i+1)}> <a href={/transaction/+ trade['tx_hash']} target='_blank'> {trade['tx_hash']} </a> </td>
		        </tr>
          );
          //  <td key={"pymntcurrency"+(i+1)}> {pymnt['currency']}</td>
          //  <td key={"pymntamount"+(i+1)}> {FormatUtils.formatValue(pymnt['amount'])}</td>
          //  <td className="balancetable_address" key={"pymntsource"+(i+1)}> <a href={"/app/"+pymnt['source']} target="_blank" >{pymnt['source']} </a></td>
          //  <td key={"pymntsourcecurrency"+(i+1)}> {pymnt['source_currency']}</td>
          //  <td className="balancetable_address" key={"pymntdestination"+(i+1)}> <a href={"/app/"+pymnt['source']} target="_blank" > {pymnt['destination']} </a> </td>
          //  <td key={"pymnttime"+(i+1)}> {FormatUtils.formatTime(pymnt['executed_time'], 'pymnt')}</td>
          //  <td className="balancetable_address pymnttxhash" key={"pymnttxhash"+(i+1)}> <a href={/transaction/+ pymnt['tx_hash']} target='_blank'> {pymnt['tx_hash']} </a> </td>
    		})
    	}

    	return rows;
    }

});



module.exports = Exchanges;