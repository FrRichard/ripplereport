var d3 = require("d3");
var DataHelper = require("DataHelper");
var SvgCommon = require('SvgCommon');
var React = require('react');

function PieChart(el,data,id,size) {
	this.initChart(el,data,id,size);
}

PieChart.prototype.parse = function(data) {
	// Non non, piechart neutre parsing dans la vue en amont
	// this.data =this.dataHelper.overviewPieChart(data);
}

PieChart.prototype.initChart = function(el,data,id,size) {
	var self = this;
	this.width = size[0];
	this.height = size[1];
	this.margin = {top: 0, right: 20, bottom: 0, left: 20};
	this.radius = Math.min(this.width,this.height)/2;
	this.labelRadius = this.width*0.40;
	this.svg = d3.select(el).append("svg")
			.attr("width", self.width + this.margin.right + this.margin.left)
			.attr("height",self.height + this.margin.top + this.margin.bottom)
			.attr("class","piechart_overview")
		.append("g")
			.attr("transform", "translate("+ (self.width/2 +self.margin.left) + "," + self.height/2 + ")");
			
	this.colors = SvgCommon.colors.currencies;
	
	this.arc = d3.svg.arc()
		.outerRadius(this.radius-40)
		.innerRadius(25);

	this.datas = this.parse(data);
	this.update(el,this.datas,id);
}

PieChart.prototype.update = function(el,data,id) {
	this.draw(el,data,id);
}

PieChart.prototype.parse = function(data) {
	var total = 0;
	var oneprct = 0;
	var result = [];

	_.each(data, function(d) {
		total += d.xrpequ;
	});

	function compare (a,b) {
		if(a.xrpequ < b.xrpequ) {
			return -1;
		}
		if(a.xrpequ > b.xrpequ) {
			return 1;
		}
		return 0;
	}

	sorteddata = data.sort(compare);

	_.some(sorteddata, function(d,i) {
		oneprct += d.xrpequ;
		if(oneprct >= (total/100) > 0) {
			if((oneprct - d.xrpequ) >0) {
				sorteddata.push({
					currency:"other",
					xrpequ: oneprct - d.xrpequ
				});
				result = sorteddata.slice(i);
				return true;
			} else {
				result = sorteddata;
				return true;
			}
		} 
	});

	result.reverse();

	return result;
}

PieChart.prototype.draw = function(el,datas,id) {
	var self = this;
	this.datas = datas;
	this.id = id;
	this.total = 0;
	_.each(this.datas, function(d) {
		self.total += d.xrpequ;
	});

	this.pie = d3.layout.pie()
		.sort(null)
		.value(function(d) {  return d.xrpequ });

	// removing former label
	this.svg.selectAll(".pieoverviewlabels").remove();

	this.svg.selectAll('g .arc').remove();
		
	this.g = this.svg.selectAll(".arc")
			.data(this.pie(self.datas));

	this.g.enter().append("g")
		.attr("class","arc")
		.attr("id", function(d,i) {
			if(d.data.issuer == undefined) {
				return self.id+d.data.currency+"";
			} else {
				return self.id+d.data.currency+d.data.issuer;
			}
		});



	this.g.append("path")
		.attr("d",this.arc)
		.style("fill", function(d) { return self.colors[d.data.currency] } )
		.on("mouseover" , function() {
			d3.selectAll("#"+self.id +" .arc").style({
				"opacity":"0.25",
			});
			d3.select(this.parentNode).style({
				"opacity":1
			});

			d3.select(this.parentNode).selectAll(".piechartLabel").style({
				"fill":"#004756"
			});

			d3.select(this.parentNode).selectAll(".piecharthiddenLabel").style({
				"visibility":"visible",
				"fill":"#004756"
			});
		})
		.on("mouseout", function() {
			d3.selectAll("#"+self.id +" .arc").style("opacity",1);
			d3.select(this.parentNode).selectAll(".piecharthiddenLabel").style("visibility","hidden");
			d3.select(this.parentNode).selectAll(".piechartLabel").style({
				"fill":"#83828C"
			});
		});

	this.g.append("text")	
		.text(function(d) {
			return d.data.currency;
		})
		.attr("transform", function(d) {
			if(datas.length == 1) {
				var c = self.arc.centroid(d);
				var x = c[0] + this.getBBox().width/7;
			    var y = c[1] * 1.6;

				return "translate(" + x + "," + y + ")";
			} else {
			    var c = self.arc.centroid(d);
			    c[0] = c[0] * 1.8;
			    c[1] = c[1] *1.8;
			   	var x = c[0];
			    var y = c[1];
				return "translate(" + x + "," + y + ")";
			}
		})
		.attr("dy", function() {
			return (this.getBBox().height/4);
		})
		.attr("dx", function() {
			return -this.getBBox().width/2;
		})
		.attr("class","piechartLabel")
		.append('tspan').text(function(d) {
			var prct = Math.trunc((d.data.xrpequ/self.total)*10000)/100;
			return prct+"%";
		})
		.attr('dx',function() {
			return d3.select(this.parentNode)[0][0].dx.baseVal[0].value*1.8;
		})
		.attr('dy',12)
		.attr("class","piecharthiddenLabel");

	var piechartlabel = d3.selectAll(".piechartLabel");
	var prev;

	_.each(piechartlabel[0], function(label,i) {
		
		if(i > 0) {
			var thisbb = label.getBoundingClientRect();
			var prevbb = prev.getBoundingClientRect();
			if(!(thisbb.right < prevbb.left || 
                thisbb.left > prevbb.right || 
                thisbb.bottom < prevbb.top || 
                thisbb.top > prevbb.bottom)) {
			 		d3.select(label).attr("class","piecharthiddenLabel");
			 }
		}

		prev = label;

	});
	
};

PieChart.prototype.nodata = function(el) {
	d3.select(el).append("text").text("This account didn't issuer any IOU");
}

PieChart.prototype.remove = function(el) {
};


module.exports = PieChart;