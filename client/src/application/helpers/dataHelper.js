

   var DataHelper = function() {};

   DataHelper.prototype.overviewPieChart = function(datasets) {
   };

   DataHelper.prototype.BarChart = function(datasets) {
      var data = [];
      _.each(datasets, function(d,key) {
         var obj = { value:d, type:key };
         if(key == "OfferCreate") {
            obj.type = "Created";
            data.push(obj);
         } else if (key == "OfferCancel") {
            obj.type = "Cancelled";
            data.push(obj);
         }
      });

      return data;
   };

   DataHelper.prototype.accountoffers = function(datasets) {
      var data = [];
      _.each(datasets.offers, function(d) {
         if(!_.isObject(d.taker_gets)) {
            var obj = { 
               order:"sell",
               taker_gets: {
                  currency: "XRP",
                  issuer:"",
                  value: parseInt(d.taker_gets/Math.pow(10,6))
               },
               taker_pays: {
                  currency: d.taker_pays.currency,
                  issuer: d.taker_pays.issuer,
                  value: parseFloat(d.taker_pays.value)
               },
               rate: parseInt(d.taker_gets/Math.pow(10,6))/ parseFloat(d.taker_pays.value)
            }
            data.push(obj);
         } else if(!_.isObject(d.taker_pays)) {
            var obj = { 
               order:"buy",
               taker_gets: {
                  currency: d.taker_gets.currency,
                  issuer: d.taker_gets.issuer,
                  value: parseFloat(d.taker_gets.value)
               },
               taker_pays: {
                  currency: "XRP",
                  issuer:"",
                  value: parseInt(d.taker_pays/Math.pow(10,6))
               },
               rate: parseFloat(d.taker_gets.value)/parseInt(d.taker_pays/Math.pow(10,6))
            }
            data.push(obj);
         } else {
            var obj = {
               order:"exchange",
               taker_gets: {
                  currency: d.taker_gets.currency,
                  issuer: d.taker_gets.issuer,
                  value: parseFloat(d.taker_gets.value)
               },
               taker_pays: {
                  currency: d.taker_pays.currency,
                  issuer: d.taker_pays.issuer,
                  value: parseFloat(d.taker_pays.value)
               },
               rate:  parseFloat(d.taker_gets.value)/parseFloat(d.taker_pays.value)
            }
            data.push(obj);
         }
      });
      return(data);
   
   };


module.exports = DataHelper;

