var React = require('react');
var PaymentStore = require('PaymentStore2');
var Table = require('react-bootstrap').Table;
var FormatUtils = require("FormatUtils");

var Payments = React.createClass({

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
          <div className="panel-body payments balancetable " >
              { this.state.isloading ?  <div><img className="loading" src={'/img/loading2.gif'} /></div> : ''}
                { !this.state.isloading ?
              <Table striped bordered condensed hover>
                    <thead>
                      <th> Amount </th>
                      <th> Source </th>
                      <th> Source Currency</th>
                      <th> Destination </th>
                      <th> Time </th>
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
		PaymentStore.addChangeListener('change',this._onChange);
		PaymentStore.addChangeListener('isloading', this._onLoading);
	},

	_onChange: function() {
		var result = PaymentStore.getAll().toJSON();
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
    	if(this.state.payments.length > 0) {
    		this.state.payments.reverse();
    		_.each(this.state.payments, function(pymnt, i ) {
    			if(pymnt.destination == self.state[0].address) {
    				var type = "received";
    			} else {
    				var type = "sent";
    			}
    			rows.push(
	    			<tr key={"paymenttable"+(i+1)} className= {type} >              
  						<td key={"pymntamount"+(i+1)}> {pymnt['currency']  + ' ' + FormatUtils.formatValue(pymnt['amount'])}</td>
  						<td className="balancetablepymnt_address" key={"pymntsource"+(i+1)}> <a href={"/app/"+pymnt['source']} target="_blank" >{pymnt['source']} </a></td>
  						<td key={"pymntsourcecurrency"+(i+1)} className="source_currency"> {pymnt['source_currency']}</td>
  						<td className="balancetablepymnt_address" key={"pymntdestination"+(i+1)}> <a href={"/app/"+pymnt['destination']} target="_blank" > {pymnt['destination']} </a> </td>
  						<td className="pymnt_time" key={"pymnttime"+(i+1)}> {FormatUtils.formatTime(pymnt['executed_time'], 'pymnt')}</td>
  						<td className="balancetable_address pymnttxhash" key={"pymnttxhash"+(i+1)}> <a href={/transaction/+ pymnt['tx_hash']} target='_blank'> {pymnt['tx_hash']} </a> </td>
		        </tr>
    			);
    		})
    	}

    	return rows;
    }

});



module.exports = Payments;