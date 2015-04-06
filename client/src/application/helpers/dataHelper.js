

   var DataHelper = function() {};

   DataHelper.prototype.overviewPieChart = function(datasets) {
      var data = [];
      _.map(datasets.ripplelines.lines,function(line) {
         if( line.balance > 0 ) {
            
            var balance = { balance:parseFloat(line.balance), currency:line.currency, xrpequ:"" };

            // Chercher l'équivalent de la currency en XRP pour pie chart proportionnelle à la valeur de chaque actif
             _.each(datasets.rippleexchangerates, function(account) {
               if(_.isObject(account)) {
                  if( line.currency == account.base.currency ) {
                     var xrpequivalent = line.balance*account.last;       
                     balance.xrpequ = xrpequivalent;  
                  }
               };
            });
                  
            data.push(balance);
         }
      
      });
      
      //Add XRP
      var xrpbalance ={ 
         balance:parseFloat((datasets.rippleinfos.account_data.Balance)*Math.pow(10,-6)), 
         currency:"XRP",
         xrpequ:parseFloat((datasets.rippleinfos.account_data.Balance)*Math.pow(10,-6))
      };

      data.push(xrpbalance);
   
      data.sort(function(a,b) {
         if (a.currency < b.currency) 
            return -1;
         if(a.currency > b.currency)
            return 1;
         return 0
      });

      return data;
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

