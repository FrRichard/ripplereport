define('depthDataHelper', ['FormatUtils'], function(FormatUtils) {

   var DepthDataHelper = function() {};

   DepthDataHelper.prototype.computeDepth = function(depth) {
      var data = depth.attributes;

      var bids = data.bids;
      var asks = data.asks;
      bids.sort(function(a,b) {
         return b.price-a.price;
      });
       
      asks.sort(function(a,b) {
         return a.price-b.price;
      });
   
      var maxBid = _.max(bids, function(bid) {
         return bid.price;
      });

      var minAsk = _.min(asks, function(ask) {
         return ask.price;
      });

      // Get +/- 20 %
      var minIntervalleBid = maxBid.price - (maxBid.price * 20 / 100);
      // var maxIntervalleBid = maxBid.price + (maxBid.price * 20 / 100);
      var bids = _.filter(bids, function(bid) {
         return minIntervalleBid <= bid.price;
      });

      // var minIntervalleAsk = minAsk.price - (minAsk.price * 20 / 100);
      var maxIntervalleAsk = minAsk.price + (minAsk.price * 20 / 100);
      var asks = _.filter(asks, function(ask) {
         return ask.price <= maxIntervalleAsk;
      });

      if (bids.length == 0 || asks.length == 0) return;

      var MurBids = []; //Tableau Prix-Somme des amounts achats [Prix,AmountCumulé];
      var AmountBids = [0];
      var PriceBids = [];
      var MurAsks = []; //Tableau Prix-Somme des amounts vente [Prix,AmountCumulé];
      var AmountAsks = [0];
      var PriceAsks = [];
      var maxNbPoints = 150;

      _.each(bids, function(bid, index) {
         if (index == 0) index = 1
         AmountBids[index] = AmountBids[index - 1] + bid.amount;
         PriceBids[index] = bid.price;
         MurBids.push({
            price: PriceBids[index],
            amount: AmountBids[index]
         });
      });

      _.each(asks, function(ask, index) {
         if (index == 0) index = 1
         AmountAsks[index] = AmountAsks[index - 1] + ask.amount;
         PriceAsks[index] = ask.price;
         MurAsks.push({
            price: PriceAsks[index],
            amount: AmountAsks[index]
         });
      });

      if (_.last(MurBids).amount > _.last(MurAsks).amount) {
         DepthMin = MurAsks;
         DepthMax = MurBids;
      } else {
         DepthMin = MurBids;
         DepthMax = MurAsks;
      };

      // On garde seulement 1/10 points de l'union des 2 tableaux triée par prix croissant
      var Circles = _.chain(_.union(MurAsks, MurBids))
         .sortBy(function(point) {
            return point.price;
         })
         .filter(function(item, index) {
            return index % 10 == 0;
         })
         .value();
   
      return {
         DepthMax: DepthMax,
         DepthMin: DepthMin,
         Circles: Circles,
         MurBids: MurBids,
         MurAsks: MurAsks,
         maxBid: maxBid,
         minAsk: minAsk
      };

   }

   return DepthDataHelper;

});