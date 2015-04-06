var Config = {
	account: {
		items: [{
	          key: 'keyfact1',
	          title:'Balances',
	          icon:'fa fa-bar-chart',
	          width: 2,
	          height: 3,
	          col: 2,
	          row: 1,
	          datatype:"rippleaccount"
	        },
	        {
	          key: 'keyfact2',
	          title:'Balances Overview',
	          icon:'fa fa-bar-chart',
	          width: 1,
	          height: 3,
	          col: 1,
	          row: 1,
	          datatype:"accountoverview",
	          chart:"pie_accountoverview"
	        },
	        {
	          key: 'keyfact3',
	          title:'IOUs issued',
	          icon:'fa fa-bar-chart',
	          width: 2,
	          height: 3,
	          col: 2,
	          row: 4,
	          datatype:"ripplecapitalization"
	        },
	        {
	          key: 'keyfact4',
	          title:'IOUs issued Overview',
	          icon:'fa fa-bar-chart',
	          width: 1,
	          height: 3,
	          col: 1,
	          row: 4,
	          datatype:"capitalizationoverview",
	          chart:"pie_accountoverview"
	        },
	              {
	          key: 'keyfact5',
	          title:'Account_offfers_exercised',
	          icon:'fa fa-bar-chart',
	          width: 2,
	          height: 4,
	          col: 2,
	          row: 8,
	          datatype:"rippleoffersexercised"
	        },
	        {
	          key: 'keyfact6',
	          title:'offers_exercised_summary',
	          icon:'fa fa-bar-chart',
	          width: 1,
	          height: 4,
	          col: 1,
	          row: 8,
	          datatype:"rippleoffersexercisedsummary"
	        },
	        {
	          key: 'keyfact7',
	          title:'account_transactions',
	          icon:'fa fa-bar-chart',
	          width: 2,
	          height: 4,
	          col: 2,
	          row:12,
	          datatype:"rippleaccounttransactions"
	        },
	        {
	          key: 'keyfact8',
	          title:'account_transactions_summary',
	          icon:'fa fa-bar-chart',
	          width: 1,
	          height: 4,
	          col: 1,
	          row: 12,
	          datatype:"rippleaccounttransactionssummary"
	        },
	        {
	          key: 'keyfact9',
	          title:'Ongoing offers',
	          icon:'fa fa-bar-chart',
	          width: 2,
	          height: 3,
	          col: 1,
	          row: 16,
	          datatype:"rippleaccountoffers"
	        },
	        {
	          key: 'keyfact10',
	          title:'account_transaction_stats',
	          icon:'fa fa-bar-chart',
	          width: 1,
	          height: 3,
	          col: 3,
	          row: 16,
	          datatype:"rippleaccounttransactionstats",
	          chart:"barchart"
	        }]
	}
     
};

module.exports = Config;