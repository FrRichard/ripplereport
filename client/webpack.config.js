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
		path: path.join(__dirname, '/dist/js'),
		publicPath: '/dist/',
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
			Config: path.join(__dirname, './src/application/config/Global'),
			ConfigRippleAccount: path.join(__dirname,'./src/application/config/ConfigRippleAccount'),	
			ConfigRippleDataApi: path.join(__dirname, './src/application/config/ConfigRippleDataApi'),
			ConfigHistoricalApi: path.join(__dirname, './src/application/config/ConfigHistoricalApi'),
			ParametersManagerConfig:path.join(__dirname, './src/application/config/ParametersManagerConfig'),

			// views config
			ConfigDashboards: path.join(__dirname, './src/application/views/components/dashboard/ConfigDashboards'),

			

			// Helpers
			DataHelper: path.join(__dirname, './src/application/helpers/DataHelper'),

			// Utils
			FormatUtils: path.join(__dirname, './src/application/utils/FormatUtils'),
			GatewayNames: path.join(__dirname, './src/application/utils/GatewayNames'),
			AddressValidator: path.join(__dirname, './src/application/utils/AddressValidator'),
			TransactionViewBuilder: path.join(__dirname, './src/application/utils/TransactionViewBuilder'),
			BigNumber: path.join(__dirname, './src/application/utils/BigNumber'),
			Uuid: path.join(__dirname, './src/application/utils/Uuid'),
			
			//SVG & views common styles
			SvgCommon: path.join(__dirname, './style/charts/SvgCommon'),
			ViewCommon: path.join(__dirname, './style/subcomponents/ViewCommon'),

			// Views
			App: path.join(__dirname, './src/application/views/app/AppView'),
			Transaction: path.join(__dirname, './src/application/views/transaction/TransactionView'),
			Price: path.join(__dirname, './src/application/views/price/PriceView'),
			Account: path.join(__dirname, './src/application/views/account/AccountView'),
			AuthComponent: path.join(__dirname, './src/application/views/auth/AuthComponentView'),
			RegisterComponent: path.join(__dirname, './src/application/views/auth/RegisterComponentView'),
			Settings: path.join(__dirname, './src/application/views/settings/SettingsComponentView'),
			Features: path.join(__dirname, '/src/application/views/features/FeaturesView'),
			PaymentTracking: path.join(__dirname, '/src/application/views/components/subcomponents/PaymentTrackingView'),

			//chartsD3
			PieChartD3: path.join(__dirname, './src/application/views/components/charts/d3/PieChart'),
			PieChartBigNumberD3: path.join(__dirname, './src/application/views/components/charts/d3/PieChartBigNumberD3'),
			BarChartD3: path.join(__dirname, './src/application/views/components/charts/d3/BarChartD3'),
			OffersExercisedTotal: path.join(__dirname, './src/application/views/components/charts/d3/OffersExercisedTotal'),
			LineChart: path.join(__dirname, './src/application/views/components/charts/d3/LineChart'),
			BarChart2D3: path.join(__dirname, './src/application/views/components/charts/d3/BarChart2D3'),
			PaymentGraphD3: path.join(__dirname, './src/application/views/components/charts/d3/PaymentGraphD3'),
			//chartsREACT
			PieChartReact: path.join(__dirname, './src/application/views/components/charts/reactcomponents/PieChart'),
			PieChartBigNumber_react: path.join(__dirname, './src/application/views/components/charts/reactcomponents/PieChartBigNumber'),
			BarChartReact: path.join(__dirname, './src/application/views/components/charts/reactcomponents/BarChart'),
			BarChart2React: path.join(__dirname, './src/application/views/components/charts/reactcomponents/BarChart2'),
			PaymentGraphReact: path.join(__dirname, './src/application/views/components/charts/reactcomponents/PaymentGraph'),
			// components (sub-views)
			Topbar: path.join(__dirname, './src/application/views/components/topbar/Topbar'),
			Footer: path.join(__dirname, './src/application/views/components/footer/Footer'),
			SideMenu: path.join(__dirname, './src/application/views/components/sidemenu/Sidemenu'),
			// SearchComponent: path.join(__dirname, './src/components/search/searchComponent'),
			Dashboard: path.join(__dirname, './src/application/views/components/dashboard/Dashboard'),
			AddWidget: path.join(__dirname,'./src/application/views/components/dashboard/AddWidget'),
			RemoveWidget: path.join(__dirname,'./src/application/views/components/dashboard/RemoveWidget'),

			//subcomponents (finest granularity)
			RippleAccount: path.join(__dirname, './src/application/views/components/subcomponents/RippleAccount'),
			RippleCapitalization: path.join(__dirname, './src/application/views/components/subcomponents/RippleCapitalization'),
			RippleOffersExercised: path.join(__dirname, './src/application/views/components/subcomponents/RippleOffersExercised'),
			RippleOffersExercisedSummary: path.join(__dirname, './src/application/views/components/subcomponents/RippleOffersExercisedSummary'),
			RippleAccountTransactions: path.join(__dirname, './src/application/views/components/subcomponents/RippleAccountTransactions'),
			RippleAccountTransactionsSummary: path.join(__dirname, './src/application/views/components/subcomponents/RippleAccountTransactionsSummary'),
			RippleAccountTransactionStats: path.join(__dirname, './src/application/views/components/subcomponents/RippleAccountTransactionStats'),

			PaymentTrackingSearchView: path.join(__dirname, './src/application/views/components/subcomponents/PaymentTrackingSearchView'),
			SearchbarAccount: path.join(__dirname, './src/application/views/components/subcomponents/SearchbarAccount'),
			SearchbarTransaction: path.join(__dirname, './src/application/views/components/subcomponents/SearchbarTransaction'),
			AbstractSubcomponent: path.join(__dirname, './src/application/views/components/subcomponents/AbstractSubcomponent'),
			DropDown: path.join(__dirname, './src/application/views/components/subcomponents/DropDown'),
			AccountOverview: path.join(__dirname, './src/application/views/components/subcomponents/AccountOverview'),
			CapitalizationOverview: path.join(__dirname, './src/application/views/components/subcomponents/CapitalizationOverview'),

			//common - inner element needed for subcomponents
			CollapsableRow: path.join(__dirname, './src/application/views/components/common/CollapsableRow'),
			TableFunct:  path.join(__dirname, './src/application/views/components/common/TableFunct'),
			RawJson: path.join(__dirname, './src/application/views/components/common/RawJson'),


			//subcomponent helpers
			AddressExists: path.join(__dirname, './src/application/views/components/AddressExists'),
			AdaptGrid: path.join(__dirname, './src/application/views/components/AdaptGrid'),
			SubcomponentSelector: path.join(__dirname, './src/application/views/components/SubcomponentSelector'),
			GridElements: path.join(__dirname, './src/application/views/components/Grid'),

			// Mixin
			StoreMixin: path.join(__dirname, './src/stores/mixin/StoreMixin'),

			// Stores
			AbstractStore: path.join(__dirname, './src/stores/AbstractStore'),
			RouterStore: path.join(__dirname, './src/stores/router/RouterStore'),
			// Stores-components
			// GridStore => enregistrer la config du dashboard pour personnalisation
			GridStore: path.join(__dirname, './src/stores/GridStore'),
			// Stores-subcomponents
			IdStore: path.join(__dirname, './src/stores/subcomponents/IdStore'),
			LinesStore: path.join(__dirname, './src/stores/subcomponents/LinesStore'),
			InfosStore: path.join(__dirname,'./src/stores/subcomponents/InfosStore'),
			ExchangeRatesStore: path.join(__dirname, './src/stores/subcomponents/ExchangeRatesStore'),
			ExchangeRatesCapitalizationStore: path.join(__dirname, './src/stores/subcomponents/ExchangeRatesCapitalizationStore'),
			AccountOverviewsStore: path.join(__dirname, './src/stores/subcomponents/AccountOverviewStore'),
			CapitalizationStore: path.join(__dirname, './src/stores/subcomponents/CapitalizationStore'),
			CapitalizationOverviewStore: path.join(__dirname, './src/stores/subcomponents/CapitalizationOverviewStore'),
			OffersExercisedStore: path.join(__dirname, './src/stores/subcomponents/OffersExercisedStore'),
			AccountTransactionsStore: path.join(__dirname, './src/stores/subcomponents/AccountTransactionsStore'),
			PaymentStore: path.join(__dirname, './src/stores/subcomponents/PaymentStore'),
			AccountOffersStore: path.join(__dirname, './src/stores/subcomponents/AccountOffersStore'),
			AccountTransactionstatsStore: path.join(__dirname, './src/stores/subcomponents/AccountTransactionStatsStore'),
			MarketTradersStore: path.join(__dirname, './src/stores/subcomponents/MarketTradersStore'),
			TransactionStore: path.join(__dirname, './src/stores/subcomponents/TransactionStore'),
			RippleTradeStore: path.join(__dirname, '/src/stores/realtime/TradeStore'),
			DataroomsStore: path.join(__dirname, '/src/stores/DataroomsStore'),

			// Constants
			Constants: path.join(__dirname, './src/constants/Constants'),

			// Dispatcher
			Dispatcher: path.join(__dirname, './src/dispatcher/Dispatcher'),

			// Actions
			AccountActions: path.join(__dirname, './src/actions/AccountActions'),
			DataActions: path.join(__dirname,'./src/actions/DataActions'),
			DashboardActions: path.join(__dirname, './src/actions/DashboardActions'),
			RealtimeActions: path.join(__dirname, './src/actions/RealtimeActions'),
			PollingActions: path.join(__dirname, './src/actions/PollingActions'),

			//managers
			RippleSocketManager: path.join(__dirname, '/src/application/managers/sockets/RippleSocketManager'),
			LongPollingSocketManager: path.join(__dirname, '/src/application/managers/sockets/LongPollingSocketManager'),
			ParametersManager: path.join(__dirname, '/src/application/managers/ParametersManager'),

			//collections
			Trades: path.join(__dirname, './src/application/collections/realtime/Trades'),
			Lines: path.join(__dirname, './src/application/collections/Lines'),
			Ids: path.join(__dirname, './src/application/collections/Ids'),
			Infos: path.join(__dirname, './src/application/collections/Infos'),
			ExchangeRates: path.join(__dirname, './src/application/collections/Exchangerates'),
			Capitalizations:path.join(__dirname, './src/application/collections/Capitalizations'),
			Offersexercised:path.join(__dirname, './src/application/collections/OffersExercised'),
			AccountTransactions:path.join(__dirname, './src/application/collections/AccountTransactions'),
			AccountOffers: path.join(__dirname, './src/application/collections/AccountOffers'),
			AccountTransactionStats: path.join(__dirname, './src/application/collections/AccountTransactionStats'),
			MarketTraders: path.join(__dirname, './src/application/collections/MarketTraders'),
			Transactions: path.join(__dirname, './src/application/collections/Transactions'),
			Grids: path.join(__dirname, './src/application/collections/Grids'),

			//models
			Trade: path.join(__dirname, './src/application/models/realtime/Trade'),
			Line: path.join(__dirname, './src/application/models/Line'),
			Id: path.join(__dirname, './src/application/models/Id'),
			Info: path.join(__dirname, './src/application/models/Info'),
			ExchangeRate: path.join(__dirname, './src/application/models/ExchangeRate'),
			Capitalization: path.join(__dirname, './src/application/models/Capitalization'),
			OfferExercised: path.join(__dirname, './src/application/models/OfferExercised'),
			AccountTransaction: path.join(__dirname, './src/application/models/AccountTransaction'),
			AccountOffer: path.join(__dirname, './src/application/models/AccountOffer'),
			AccountTransactionStat: path.join(__dirname, './src/application/models/AccountTransactionStat'),
			MarketTrader: path.join(__dirname, './src/application/models/MarketTrader'),
			Transaction: path.join(__dirname, './src/application/models/Transaction'),
			Grid: path.join(__dirname, './src/application/models/Grid'),

			//routers
			AccountRouter: path.join(__dirname,'./src/application/routers/account.router'),
			AppRouter: path.join(__dirname, './src/application/routers/app.router'),
			EventsController: path.join(__dirname, './src/application/routers/eventscontroller'),
			// Internal libs
			gridster: path.join(__dirname, './lib/internal-libs/jquery.gridster/gridster'),
			gridsterResponsive: path.join(__dirname, './lib/internal-libs/gridster-responsive/gridster.responsive'),
			ChartEngine: path.join(__dirname, './lib/internal-libs/chartEngine/ChartEngine'),
			jsonViewer: path.join(__dirname, './lib/internal-libs/jquery.json-viewer/jquery.json-viewer'),
			cola: path.join(__dirname, './lib/internal-libs/cola/cola.V3.min.js'),

			// External libs
			backbone: path.join(__dirname, './lib/bower_components/backbone/backbone'),
			bootstrap: path.join(__dirname, './lib/bower_components/bootstrap/dist/js/bootstrap'),
			jquery: path.join(__dirname, './lib/bower_components/jquery/dist/jquery'),
			lodash: path.join(__dirname, './lib/bower_components/lodash/dist/lodash'),
			modernizr: path.join(__dirname, './lib/bower_components/modernizr/modernizr'),
			jsSchema: path.join(__dirname, './lib/bower_components/js-schema/js-schema.debug'),
			chance: path.join(__dirname, './lib/bower_components/chance/chance'),
			numeral: path.join(__dirname, './lib/bower_components/numeral/numeral'),
			moment: path.join(__dirname, './lib/bower_components/momentjs/moment'),
			localstorage: path.join(__dirname, './lib/bower_components/store.js/store+json2.min'),
			d3: path.join(__dirname, './lib/bower_components/d3/d3.min'),
			// socketio: path.join(__dirname, '/lib/socket.io.min'),

			// Home page libs
			classie: path.join(__dirname, './lib/internal-libs/home/classie'),
			cbpAnimatedHeader: path.join(__dirname, './lib/internal-libs/home/cbpAnimatedHeader'),
			jqueryEasing: path.join(__dirname, './lib/internal-libs/home/jquery.easing'),

			
			
			// Bundles
			appBundle: path.join(__dirname, './src/bundle/app'),
			homeBundle: path.join(__dirname, './src/bundle/home'),
			loginBundle: path.join(__dirname, './src/bundle/login'),
			registerBundle: path.join(__dirname, './src/bundle/register'),
			accountBundle: path.join(__dirname, './src/bundle/account'),
			// componentsBundle: path.join(__dirname, './src/bundle/components'),
			
			// Other
			intZ: path.join(__dirname, './lib/other/int')
		}
	},

	plugins: [
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			_: 'lodash',
			Backbone: 'backbone',
			Cola: 'cola'
		})
	]
};