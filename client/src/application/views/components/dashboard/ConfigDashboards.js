var Config = {
	gateway: {
		items: [{
	          key: 'keyfact2',
	          title:'Balances Overview',
	          icon:'fa fa-university',
	          width: 4,
	          height: 3,
	          col: 0,
	          row: 0,
	          datatype:"AccountOverview",
	          chart:"pie_accountoverview"
	        },
	        {
	          key: 'keyfact1',
	          title:'Balances',
	          icon:'fa fa-university',
	          width: 8,
	          height: 3,
	          col: 5,
	          row: 0,
	          datatype:"RippleAccount"
	        },

	        {
	          key: 'keyfact5',
	          title:'Payments',
	          icon:'fa fa-exchange',
	          width: 8,
	          height: 4,
	          col: 5,
	          row:4,
	          datatype:"RippleAccountTransactions"
	        },
	        {
	          key: 'keyfact6',
	          title:'Payments Summary',
	          icon:'fa fa-exchange',
	          width: 4,
	          height: 4,
	          col: 0,
	          row: 4,
	          datatype:"RippleAccountTransactionsSummary"
	        },
	        // {
	        //   key: 'keyfact7',
	        //   title:'Offers Exercised',
	        //   icon:'fa fa-area-chart',
	        //   width: 8,
	        //   height: 4,
	        //   col: 5,
	        //   row: 8,
	        //   datatype:"RippleOffersExercised"
	        // },
	        // {
	        //   key: 'keyfact8',
	        //   title:'Offers Exercised Summary',
	        //   icon:'fa fa-area-chart',
	        //   width: 4,
	        //   height: 4,
	        //   col: 0,
	        //   row: 8,
	        //   datatype:"RippleOffersExercisedSummary"
	        // },
	        {
	          key: 'keyfact9',
	          title:'Ongoing offers',
	          icon:'fa fa-arrow-right',
	          width: 8,
	          height: 3,
	          col: 0,
	          row: 11,
	          datatype:"RippleAccountOffers"
	        },
	        {
	          key: 'keyfact10',
	          title:'account_transaction_stats',
	          icon:'fa fa-bar-chart',
	          width: 4,
	          height: 3,
	          col: 9,
	          row: 11,
	          datatype:"RippleAccountTransactionStats",
	          chart:"barchart"
	        },
	        {
	          key: 'keyfact3',
	          title:'Capitalization',
	          icon:'fa fa-pie-chart',
	          width: 8,
	          height: 3,
	          col: 5,
	          row: 8,
	          datatype:"RippleCapitalization"
	        },
	        {
	          key: 'keyfact4',
	          title:'Capitalization Overview',
	          icon:'fa fa-pie-chart',
	          width: 4,
	          height: 3,
	          col: 0,
	          row: 8,
	          datatype:"CapitalizationOverview",
	          chart:"pie_accountoverview"
	        }
	    ]
	},
	account: {
		items: [{
	          key: 'keyfact2',
	          title:'Balances Overview',
	          icon:'fa fa-university',
	          width: 4,
	          height: 3,
	          col: 0,
	          row: 0,
	          datatype:"AccountOverview",
	          chart:"pie_accountoverview"
	        },
	        {
	          key: 'keyfact1',
	          title:'Balances',
	          icon:'fa fa-university',
	          width: 8,
	          height: 3,
	          col: 5,
	          row: 0,
	          datatype:"RippleAccount"
	        },

	        {
	          key: 'keyfact5',
	          title:'Payments',
	          icon:'fa fa-exchange',
	          width: 8,
	          height: 4,
	          col: 5,
	          row:4,
	          datatype:"RippleAccountTransactions"
	        },
	        {
	          key: 'keyfact6',
	          title:'Payments Summary',
	          icon:'fa fa-exchange',
	          width: 4,
	          height: 4,
	          col: 0,
	          row: 4,
	          datatype:"RippleAccountTransactionsSummary"
	        },
	        // {
	        //   key: 'keyfact7',
	        //   title:'Offers Exercised',
	        //   icon:'fa fa-area-chart',
	        //   width: 8,
	        //   height: 4,
	        //   col: 5,
	        //   row: 8,
	        //   datatype:"RippleOffersExercised"
	        // },
	        // {
	        //   key: 'keyfact8',
	        //   title:'Offers Exercised Summary',
	        //   icon:'fa fa-area-chart',
	        //   width: 4,
	        //   height: 4,
	        //   col: 0,
	        //   row: 8,
	        //   datatype:"RippleOffersExercisedSummary"
	        // },
	        {
	          key: 'keyfact9',
	          title:'Ongoing offers',
	          icon:'fa fa-arrow-right',
	          width: 8,
	          height: 3,
	          col: 0,
	          row: 8,
	          datatype:"RippleAccountOffers"
	        },
	        {
	          key: 'keyfact10',
	          title:'account_transaction_stats',
	          icon:'fa fa-bar-chart',
	          width: 4,
	          height: 3,
	          col: 9,
	          row: 8,
	          datatype:"RippleAccountTransactionStats",
	          chart:"barchart"
	        },
	          {
	          key: 'keyfact3',
	          title:'Capitalization',
	          icon:'fa fa-pie-chart',
	          width: 8,
	          height: 3,
	          col: 5,
	          row: 11,
	          datatype:"RippleCapitalization"
	        },
	        {
	          key: 'keyfact4',
	          title:'Capitalization Overview',
	          icon:'fa fa-pie-chart',
	          width: 4,
	          height: 3,
	          col: 0,
	          row: 11,
	          datatype:"CapitalizationOverview",
	          chart:"pie_accountoverview"
	        }
	    ]
	},

	paymenttracking: {

		items: [
			{
			  key: 'keyfact1',
			  title: 'Payments Tracking',
			  width: 3,
			  height: 8,
			  col: 1,
			  row: 1,
			  datatype: "PaymentTrackingView"
			},
			{
	          key: 'keyfact2',
	          title:'Payments',
	          icon:'fa fa-exchange',
	          width: 2,
	          height: 4,
	          col: 2,
	          row:9,
	          datatype:"RippleAccountTransactions"
	        },
	        {
	          key: 'keyfact3',
	          title:'Payments Summary',
	          icon:'fa fa-exchange',
	          width: 1,
	          height: 4,
	          col: 1,
	          row: 9,
	          datatype:"RippleAccountTransactionsSummary"
	        }
		]

	}

     
};

module.exports = Config;