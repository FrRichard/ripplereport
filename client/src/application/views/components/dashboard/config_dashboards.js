var Config = {
	account: {
		items: [{
	          key: 'keyfact1',
	          title:'Balances',
	          icon:'fa fa-university',
	          width: 2,
	          height: 3,
	          col: 2,
	          row: 1,
	          datatype:"rippleaccount"
	        },
	        {
	          key: 'keyfact2',
	          title:'Balances Overview',
	          icon:'fa fa-university',
	          width: 1,
	          height: 3,
	          col: 1,
	          row: 1,
	          datatype:"accountoverview",
	          chart:"pie_accountoverview"
	        },
	        {
	          key: 'keyfact3',
	          title:'Capitalization',
	          icon:'fa fa-pie-chart',
	          width: 2,
	          height: 3,
	          col: 2,
	          row: 4,
	          datatype:"ripplecapitalization"
	        },
	        {
	          key: 'keyfact4',
	          title:'Capitalization Overview',
	          icon:'fa fa-pie-chart',
	          width: 1,
	          height: 3,
	          col: 1,
	          row: 4,
	          datatype:"capitalizationoverview",
	          chart:"pie_accountoverview"
	        },
	              {
	          key: 'keyfact5',
	          title:'Offers Exercised',
	          icon:'fa fa-area-chart',
	          width: 2,
	          height: 4,
	          col: 2,
	          row: 8,
	          datatype:"rippleoffersexercised"
	        },
	        {
	          key: 'keyfact6',
	          title:'Offers Exercised Summary',
	          icon:'fa fa-area-chart',
	          width: 1,
	          height: 4,
	          col: 1,
	          row: 8,
	          datatype:"rippleoffersexercisedsummary"
	        },
	        {
	          key: 'keyfact7',
	          title:'Payments',
	          icon:'fa fa-exchange',
	          width: 2,
	          height: 4,
	          col: 2,
	          row:12,
	          datatype:"rippleaccounttransactions"
	        },
	        {
	          key: 'keyfact8',
	          title:'Payments Summary',
	          icon:'fa fa-exchange',
	          width: 1,
	          height: 4,
	          col: 1,
	          row: 12,
	          datatype:"rippleaccounttransactionssummary"
	        },
	        {
	          key: 'keyfact9',
	          title:'Ongoing offers',
	          icon:'fa fa-arrow-right',
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