
define('GrapheExceptionsUtils', function() {

	var GrapheExceptionsUtils = {};
	
	GrapheExceptionsUtils.Candle = function(candles) {

		var candlescopy = new Array();
		var j = 0;
		for (var i = 0; i <= candles.length - 1; i++) {
			if (candles[i].close != 0) {
				candlescopy[j] = candles[i];
				j++;
			}
		};
		return candlescopy;
	};

	// GrapheExceptionsUtils.Volume =function(volumes){
	// 	var volumescopy = new Array();
	// 	var j =0;
	// 	for (var i=0 ; i <=volumes.length-1; i++) {
	// 		if(volumes[i].amount !=0) {
	// 			volumescopy[j]= volumes[i];
	// 			j++;
	// 		}
	// 	};
	// 	return volumescopy;
	// };

	return GrapheExceptionsUtils;
});
