var d3 = require("d3");
var DataHelper = require("DataHelper");
var SvgCommon = require('SvgCommon');

function PieChart(chartId, data) {
	this.initChart(chartId);
}

PieChart.prototype.parse = function(data) {
	// Non non, piechart neutre parsing dans la vue en amont
	// this.data =this.dataHelper.overviewPieChart(data);
}

PieChart.prototype.initChart = function(chartId) {
	var self = this;
	this.width = 200;
	this.height = 200;
	this.radius = Math.min(this.width,this.height)/2;
	this.labelRadius = 60;
	this.svg = d3.select(('#' + chartId)).append("svg")
			.attr("width", self.width)
			.attr("height",self.height)
			.attr("class","piechart_overview")
		.append("g")
			.attr("transform", "translate("+ self.width/2 + "," + self.height/2 + ")");

	this.colors = SvgCommon.colors.currencies;
	
	this.arc = d3.svg.arc()
		.outerRadius(this.radius-40)
		.innerRadius(30);
}

PieChart.prototype.draw = function(chartId,datas) {
	var self = this;

	this.data = datas;
	// console.log("dataaaaaaaaaaaaaaaaaaaaaas_piechart",this.data);

	this.pie = d3.layout.pie()
		.sort(null)
		.value(function(d) {  return d.xrpequ });

	// removing former label
	this.svg.selectAll(".pieoverviewlabels").remove();
		
	this.g = this.svg.selectAll(".arc")
			.data(this.pie(self.data));

	this.g.enter().append("g")
		.attr("class","arc");



	this.g.append("path")
			.attr("d",this.arc)
			.style("fill", function(d) { return self.colors[d.data.currency] } );

	this.g.append("text")
		// .attr("text-anchor", function(d) {
		//     // are we past the center?
		//     return (d.endAngle + d.startAngle)/2 > Math.PI ? "end" : "start";
		// })	
		.text(function(d) { return d.data.currency })
		.attr({

		    x: function (d, i) {
		        centroid = self.arc.centroid(d);
		        midAngle = Math.atan2(centroid[1], centroid[0]);
		        x = Math.cos(midAngle) * self.labelRadius;
		        sign = (x > 0) ? 1 : -1
		        labelX = x + (5 * sign)
		        return labelX;
		    },
		    y: function (d, i) {
		        centroid = self.arc.centroid(d);
		        midAngle = Math.atan2(centroid[1], centroid[0]);
		        // ajustement partie basse du cercle
		        var a = Math.PI/2;
		        var b = Math.PI*2*0.75;
		        if(a <d.endAngle && d.endAngle<b) {
		        	y = Math.sin(midAngle) * self.labelRadius + $(this).height()/2;
		        } else {
		        	y = Math.sin(midAngle) * self.labelRadius;
		        }
		        return y;
		    },
		        'text-anchor': function (d, i) {
		        centroid = self.arc.centroid(d);
		        midAngle = Math.atan2(centroid[1], centroid[0]);
		        x = Math.cos(midAngle) * self.labelRadius;
		        return (x > 0) ? "start" : "end";
		    },
		        'class': 'pieoverviewlabels'
	})
		.append("g")
			.attr("transform", "translate("+ self.width/2 + "," + self.height/2 + ")");

	this.g.exit().remove();
};


module.exports = PieChart;