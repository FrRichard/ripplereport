FormatUtils = require('FormatUtils');
var moment = require('moment');

   var DataHelper = function() {};

   DataHelper.prototype.transactionsGriddle = function(transactions) {
      _.each(transactions, function(transaction) {
         transaction.amount = FormatUtils.formatValue(transaction.amount);
         transaction.time = moment(transaction.time).format('MMMM Do YYYY, h:mm:ss a');
      });

      return transactions;
   };

   DataHelper.prototype.PieChart_bignumber = function(data) {
      var result = [];

      if(data.cashin > 0) {
         result.push({ 
            amount: data.cashin,
            type: "Cash In"
         });
      }

      if(data.cashout > 0) {
         result.push( {
            amount: data.cashout,
            type: "Cash Out"
         });
      }

      if(data.standard > 0) {
         result.push({
            amount: data.standard,
            type: "Standard"
         });
      }
      
      return result;   
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

   DataHelper.prototype.paymentgraph = function(data, size) {
      var res = {};
      var nodes = [];
      var links = [];
      var width = size.width;
      var height = size.height;

      var findNode = function(id) {
        for (var i in nodes) {
             if (nodes[i]["id"] === id) return nodes[i];
         };
      }

      _.each(data, function(d) {
         nodes.push({
            id: d.id,
            parent: d.parent,
            name:d.name,
            type:d.type

         });
      });

      _.each(data, function(d) { 
         if(d.parent != "origin") {
            links.push({
               source: findNode(d.parent),
               target: findNode(d.id)
            });
         }
      });

      _.each(nodes, function(node) {
         if(node.parent == "origin") {
            node['y'] = 0;
            node['x'] = width/2;
            node['fixed'] = true;
         }
      });

      var res = {
         nodes:nodes,
         links:links
      }

      return res;
   }


module.exports = DataHelper;

   // this.nodes = [
      //     { id:"a", value:"100", x: (this.width/2), y: (this.height/2), fixed:true},
      //     { id:"b", value:"3000", x: 0, y: 0 },
      //     { id:"c", value:"243", x: 1, y: 2 },  
      //     { id:"d", value:"125", x: 8, y: 5 },
      //     { id:"e", value:"365", x: 25, y: 7 },
      //     { id:"f", value:"12000000000", x: 18, y: 15 }
      // ];

      // this.links = [
      //    { source: 0, target: 1 },
      //    { source: 2, target: 1 },
      //    { source: 3, target: 2 },
      //    { source: 1, target: 4 },
      //    { source: 1, target: 5 }
      // ];