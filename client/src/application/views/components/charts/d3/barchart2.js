var d3 = require('d3');
var DataHelper = require("DataHelper");
var SvgCommon = require('SvgCommon');
var moment = require('moment');

function barChart(el, data, id, size) {
	this.initChart(el, data, id, size);
}

barChart.prototype.initChart = function(el, data, id, size) {

	this.margin = { top:40, right:50, bottom:60, left:50 };
	this.width =size[0];
	this.height =size[1];

	this.svg = d3.select(el)
		.append("svg")
			.attr("width", this.width + this.margin.left + this.margin.right)
			.attr("height", this.height + this.margin.top + this.margin.bottom)
		.append("g")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
			.attr("class","barchart2");

	this.y = d3.scale.linear().range([this.height,0]);
	this.x = d3.time.scale().range([0,this.width]);
	this.xAxis = d3.svg.axis()
		.scale(this.x)
		.orient('bottom')
		.ticks(d3.time.month, 1);

	this.yAxis = d3.svg.axis()
    .scale(this.y)
    .orient("left")
    .ticks(10);

	this.update(el, data, id);
}

barChart.prototype.update = function(el, data, id, size) {
	this.draw(el, data, id);
}

barChart.prototype.draw = function(chartId,data) {
	var self = this;
	this.data = data;
	console.log("chartdataaaaaaaaaaaaaa",this.data);
	this.x.domain([moment().subtract('year',1).format('x'),
				   parseInt(d3.max(this.data, function(d) { return (moment(d.time).format('x'));}))*1.0001
					]);
	this.y.domain([0, 
					parseInt(d3.max(this.data, function(d) { return d.count; }))*1.2
					]);

	d3.select('.xaxis').remove();
	d3.select('.yaxis').remove();
	d3.select(this.svg).remove();


	this.svg.append("g")
		.attr("class", "barchart2 xaxis")
		.attr("transform", "translate(0," + (this.height) + ")")
		.style({'fill':'rgb(101, 101, 113)','font-size':'12px'})
		.call(this.xAxis)
		.selectAll("text")  
            .style("text-anchor", "end")
            .attr("transform", function(d) {
                return "rotate(-65)" 
                });

	this.svg.append("g")
		.attr("class", "barchart2 yaxis")
		.style({'fill':'rgb(101, 101, 113)','font-size':'12px'})
		.call(this.yAxis);

	this.svg.append("text")
	    .attr("class", "y label")
	    .attr("text-anchor", "end")
	    .attr("y", 6)
	    .attr("dy", ".75em")
	    .attr("transform", "rotate(-90)")
	    .text("number of transactions")
	    .style({'font-size':'12px','fill':'rgb(101, 101, 113)'});

	this.bar = this.svg.selectAll('.offersexercisedbar')
		.data(this.data);

	this.bar.enter().append("rect")
		.attr("x", function(d) {  return self.x((moment(d.time).format('x'))); })
		.attr("width", function(d) { return self.width/380; })
		.attr("y", function(d) { return self.y(d.count); })
		.attr("height", function(d) { return self.height - self.y(d.count); })
		.style("fill", "rgb(66, 45, 17)")
		.attr("class","offersexercisedbar");

	this.bar.exit().remove();

}


module.exports = barChart;