var path = require('path');
var webpack = require('webpack');

module.exports = {

	cache: true,
	context: __dirname,

	entry: {
		app: ['appBundle'],
		home: ['homeBundle'],
		login: ['loginBundle'],
		register: ['registerBundle'],
		account: ['accountBundle'],
		// components: ['componentsBundle'] component.souscomponent ..etc NON global pas bon.
	},

	output: {
		libraryTarget: 'umd',
		path: path.join(__dirname, 'dist/js/'),
		publicPath: 'dist/js/',
		filename: '[name].js',
		chunkFilename: '[chunkhash].js',
		sourceMapFilename: '[file].map'
	},

	module: {
		loaders: [{
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass']
		}, {
			test: /\.css$/,
			loaders: ['style', 'css']
		}, {
			test: /\.svg$/,
			loader: 'raw'
		}, {
			test: /\.js$/,
			loader: "jsx-loader?insertPragma=React.DOM&harmony"
		}, {
			test: /\.jsx$/,
			loader: "jsx-loader?insertPragma=React.DOM&harmony"
		}, {
			test: /\.png$/,
			loader: "url-loader?limit=100000&mimetype=image/png"
		}, {
			test: /\.jpg$/,
			loader: "file-loader"
		}, {
			test: /\.woff$/,
			loader: "url-loader?limit=10000&minetype=application/font-woff"
		}, {
			test: /\.ttf$/,
			loader: "file-loader"
		}, {
			test: /\.eot$/,
			loader: "file-loader"
		}, ]
	},

	resolve: {
		modulesDirectories: ['node_modules', 'lib/bower_components'],
		alias: {

			//config
			config: path.join(__dirname, './src/application/config/global'),
			config_rippleaccount: path.join(__dirname,'./src/application/config/config_rippleaccount'),
			config_rippledataapi: path.join(__dirname, './src/application/config/config_rippledataapi'),
			config_historicalapi: path.join(__dirname, './src/application/config/config_historicalapi'),

			// views config
			config_dashboards: path.join(__dirname, './src/application/views/components/dashboard/config_dashboards'),

			// Bundles
			appBundle: path.join(__dirname, './src/bundle/app'),
			homeBundle: path.join(__dirname, './src/bundle/home'),
			loginBundle: path.join(__dirname, './src/bundle/login'),
			registerBundle: path.join(__dirname, './src/bundle/register'),
			accountBundle: path.join(__dirname, './src/bundle/account'),
			// componentsBundle: path.join(__dirname, './src/bundle/components'),

			// Helpers
			DataHelper: path.join(__dirname, './src/application/helpers/dataHelper'),

			// Utils
			FormatUtils: path.join(__dirname, './src/application/utils/FormatUtils'),
			gatewayNames: path.join(__dirname, './src/application/utils/gatewayNames'),
			
			//SVG & views common styles
			SvgCommon: path.join(__dirname, './style/charts/svgcommon'),
			ViewCommon: path.join(__dirname, './style/subcomponents/viewcommon'),

			// Views
			App: path.join(__dirname, './src/application/views/app/app'),
			Account: path.join(__dirname, './src/application/views/account/account'),
			AuthComponent: path.join(__dirname, './src/application/views/auth/authComponent'),
			RegisterComponent: path.join(__dirname, './src/application/views/auth/registerComponent'),
			Settings: path.join(__dirname, './src/application/views/settings/settingsComponent'),

			//chartsD3
			pieChartD3: path.join(__dirname, './src/application/views/components/charts/d3/pieChart'),
			pieChartBigNumberD3: path.join(__dirname, './src/application/views/components/charts/d3/pieChart_bignumber'),
			barChartD3: path.join(__dirname, './src/application/views/components/charts/d3/barchart'),
			offersexercisedtotal: path.join(__dirname, './src/application/views/components/charts/d3/offersexercisedtotal'),
			lineChart: path.join(__dirname, './src/application/views/components/charts/d3/linechart'),
			barChart2D3: path.join(__dirname, './src/application/views/components/charts/d3/barchart2'),
			//chartsREACT
			pieChart_react: path.join(__dirname, './src/application/views/components/charts/reactcomponents/pieChart'),
			pieChart_bignumber_react: path.join(__dirname, './src/application/views/components/charts/reactcomponents/pieChart_bignumber'),
			barChart_react: path.join(__dirname, './src/application/views/components/charts/reactcomponents/barChart'),
			barChart2_react: path.join(__dirname, './src/application/views/components/charts/reactcomponents/barChart2'),
			// components (sub-views)
			Topbar: path.join(__dirname, './src/application/views/components/topbar/topbar'),
			Footer: path.join(__dirname, './src/application/views/components/footer/footer'),
			SideMenu: path.join(__dirname, './src/application/views/components/sidemenu/sidemenu'),
			// SearchComponent: path.join(__dirname, './src/components/search/searchComponent'),
			Dashboard: path.join(__dirname, './src/application/views/components/dashboard/dashboard'),
			AddWidget: path.join(__dirname,'./src/application/views/components/dashboard/addWidget'),
			RemoveWidget: path.join(__dirname,'./src/application/views/components/dashboard/removeWidget'),

			//subcomponents (finest granularity)
			RippleAccount: path.join(__dirname, './src/application/views/components/subcomponents/rippleaccount'),
			RippleCapitalization: path.join(__dirname, './src/application/views/components/subcomponents/ripplecapitalization'),
			RippleOffersExercised: path.join(__dirname, './src/application/views/components/subcomponents/rippleoffersexercised'),
			RippleOffersExercisedSummary: path.join(__dirname, './src/application/views/components/subcomponents/rippleoffersexercisedsummary'),
			RippleAccountTransactions: path.join(__dirname, './src/application/views/components/subcomponents/rippleaccounttransactions'),
			RippleAccountTransactionsSummary: path.join(__dirname, './src/application/views/components/subcomponents/rippleaccounttransactionssummary'),
			RippleAccountTransactionStats: path.join(__dirname, './src/application/views/components/subcomponents/rippleaccounttransactionstats'),
			TestItem2: path.join(__dirname, './src/application/views/components/subcomponents/testitem2'),
			Searchbar_account: path.join(__dirname, './src/application/views/components/subcomponents/searchbar_account'),
			AbstractSubcomponent: path.join(__dirname, './src/application/views/components/subcomponents/abstractsubcomponent'),
			DropDown: path.join(__dirname, './src/application/views/components/subcomponents/dropdown'),
			AccountOverview: path.join(__dirname, './src/application/views/components/subcomponents/accountoverview'),
			CapitalizationOverview: path.join(__dirname, './src/application/views/components/subcomponents/capitalizationoverview'),

			//common - inner element needed for subcomponents
			CollapsableRow: path.join(__dirname, './src/application/views/components/common/collapsablerow'),


			//subcomponent helpers
			AdaptGrid: path.join(__dirname, './src/application/views/components/adaptGrid'),
			SubcomponentSelector: path.join(__dirname, './src/application/views/components/subcomponentselector'),
			GridElements: path.join(__dirname, './src/application/views/components/grid'),
			Loading: path.join(__dirname, './src/application/views/components/loading_animation'),

			// Mixin
			StoreMixin: path.join(__dirname, './src/stores/mixin/storeMixin'),

			// Stores
			AbstractStore: path.join(__dirname, './src/stores/AbstractStore'),
			RouterStore: path.join(__dirname, './src/stores/router/routerStore'),
			// Stores-components
			// GridStore => enregistrer la config du dashboard pour personnalisation
			GridStore: path.join(__dirname, './src/stores/grid_store'),
			// Stores-subcomponents
			RippleidStore: path.join(__dirname, './src/stores/subcomponents/rippleid_store'),
			RipplelinesStore: path.join(__dirname, './src/stores/subcomponents/ripplelines_store'),
			RippleinfosStore: path.join(__dirname,'./src/stores/subcomponents/rippleinfos_store'),
			RippleexchangeratesStore: path.join(__dirname, './src/stores/subcomponents/rippleexchangerates_store'),
			RippleexchangeratescapitalizationStore: path.join(__dirname, './src/stores/subcomponents/rippleexchangeratescapitalization_store'),
			RippleaccountoverviewsStore: path.join(__dirname, './src/stores/subcomponents/rippleaccountoverview_store'),
			RipplecapitalizationStore: path.join(__dirname, './src/stores/subcomponents/ripplecapitalization_store'),
			RipplecapitalizationoverviewStore: path.join(__dirname, './src/stores/subcomponents/ripplecapitalizationoverview_store'),
			RippleoffersexercisedStore: path.join(__dirname, './src/stores/subcomponents/rippleoffersexercised_store'),
			RippleaccounttransactionsStore: path.join(__dirname, './src/stores/subcomponents/rippleaccounttransactions_store'),
			RippleaccountoffersStore: path.join(__dirname, './src/stores/subcomponents/rippleaccountoffers_store'),
			RippleaccounttransactionstatsStore: path.join(__dirname, './src/stores/subcomponents/rippleaccounttransactionstats_store'),
			RipplemarkettradersStore: path.join(__dirname, './src/stores/subcomponents/ripplemarkettraders_store'),

			// Constants
			Constants: path.join(__dirname, './src/constants/constants'),

			// Dispatcher
			Dispatcher: path.join(__dirname, './src/dispatcher/dispatcher'),

			// Actions
			AccountActions: path.join(__dirname, './src/actions/account_actions'),
			RippledataActions: path.join(__dirname,'./src/actions/rippledata_actions'),
			DashboardActions: path.join(__dirname, './src/actions/dashboard_actions'),

			//collections
			ripplelines: path.join(__dirname, './src/application/collections/ripplelines'),
			rippleids: path.join(__dirname, './src/application/collections/rippleids'),
			rippleinfos: path.join(__dirname, './src/application/collections/rippleinfos'),
			rippleexchangerates: path.join(__dirname, './src/application/collections/rippleexchangerates'),
			ripplecapitalizations:path.join(__dirname, './src/application/collections/ripplecapitalizations'),
			rippleoffersexercised:path.join(__dirname, './src/application/collections/rippleoffersexercised'),
			rippleaccounttransactions:path.join(__dirname, './src/application/collections/rippleaccounttransactions'),
			rippleaccountoffers: path.join(__dirname, './src/application/collections/rippleaccountoffers'),
			rippleaccounttransactionstats: path.join(__dirname, './src/application/collections/rippleaccounttransactionstats'),
			ripplemarkettraders: path.join(__dirname, './src/application/collections/ripplemarkettraders'),
			grids: path.join(__dirname, './src/application/collections/grids'),

			//models
			rippleline: path.join(__dirname, './src/application/models/rippleline'),
			rippleid: path.join(__dirname, './src/application/models/rippleid'),
			rippleinfo: path.join(__dirname, './src/application/models/rippleinfo'),
			rippleexchangerate: path.join(__dirname, './src/application/models/rippleexchangerate'),
			ripplecapitalization: path.join(__dirname, './src/application/models/ripplecapitalization'),
			rippleofferexercised: path.join(__dirname, './src/application/models/rippleofferexercised'),
			rippleaccounttransaction: path.join(__dirname, './src/application/models/rippleaccounttransaction'),
			rippleaccountoffer: path.join(__dirname, './src/application/models/rippleaccountoffer'),
			rippleaccounttransactionstat: path.join(__dirname, './src/application/models/rippleaccounttransactionstat'),
			ripplemarkettrader: path.join(__dirname, './src/application/models/ripplemarkettrader'),

			grid: path.join(__dirname, './src/application/models/grid'),

			//routers
			AccountRouter: path.join(__dirname,'./src/application/routers/account.router'),
			AppRouter: path.join(__dirname, './src/application/routers/app.router'),
			// Internal libs
			gridster: path.join(__dirname, './lib/internal-libs/jquery.gridster/gridster'),
			gridsterResponsive: path.join(__dirname, './lib/internal-libs/gridster-responsive/gridster.responsive'),
			ChartEngine: path.join(__dirname, './lib/internal-libs/chartEngine/ChartEngine'),

			// External libs
			backbone: path.join(__dirname, './lib/bower_components/backbone/backbone'),
			bootstrap: path.join(__dirname, './lib/bower_components/bootstrap/dist/js/bootstrap'),
			jquery: path.join(__dirname, './lib/bower_components/jquery/dist/jquery'),
			lodash: path.join(__dirname, './lib/bower_components/lodash/dist/lodash.underscore'),
			modernizr: path.join(__dirname, './lib/bower_components/modernizr/modernizr'),
			jsSchema: path.join(__dirname, './lib/bower_components/js-schema/js-schema.debug'),
			chance: path.join(__dirname, './lib/bower_components/chance/chance'),
			numeral: path.join(__dirname, './lib/bower_components/numeral/numeral'),
			moment: path.join(__dirname, './lib/bower_components/momentjs/moment'),
			localstorage: path.join(__dirname, './lib/bower_components/store.js/store+json2.min'),
			d3: path.join(__dirname, './lib/bower_components/d3/d3.min'),

			// Home page libs
			classie: path.join(__dirname, './lib/internal-libs/home/classie'),
			cbpAnimatedHeader: path.join(__dirname, './lib/internal-libs/home/cbpAnimatedHeader'),
			jqueryEasing: path.join(__dirname, './lib/internal-libs/home/jquery.easing'),
		}
	},

	plugins: [
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			_: 'lodash',
			Backbone: 'backbone'
		})
	]
};