var d3 = require('d3');
var DataHelper = require("DataHelper");
var SvgCommon = require('SvgCommon');
var moment = require('moment');

function lineChart(chartId) {
	this.initChart(chartId);
}

lineChart.prototype.initChart = function(chartId) {
	this.margin = { top:30, right:100, bottom:90, left:100 };
	this.width =600;
	this.height =250;
	this.x = d3.time.scale().range([0,this.width]);
	this.y = d3.scale.linear().range([this.height,0]);

	// var parseDate = d3.time.format
}

lineChart.prototype.draw = function(chartId,data) {
	var self = this;
	this.data = data;
	this.nestedData = d3.nest()
		.key(function(d) { return d.type ;})
		.key(function(d) { return d.currency;})
		.entries(this.data);
	this.data = this.nestedData[1].values[0].values;


	this.xAxis = d3.svg.axis().scale(this.x).orient("bottom").ticks(5);
	this.yAxis = d3.svg.axis().scale(this.y).orient("left").ticks(5);

	this.valueline = d3.svg.line()
		.x(function(d) { return this.x(Date.parse(d.time)); })
		.y(function(d) { return this.y(d.amount); });

		this.svg = d3.select('#'+chartId)
			.append("svg")
				.attr("width", this.width + this.margin.left - this.margin.right)
				.attr("height", this.height - this.margin.top + this.margin.bottom)
			.append("g")
				.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

		this.x.domain(d3.extent(this.data, function(d) {  return Date.parse(d.time);  }));
		this.y.domain([0, d3.max(this.data, function(d) { return d.amount;})]);

		this.svg.append("path").attr("d", this.valueline(this.data));

		this.svg.append("g")
			.attr("class", "x lineaxis")
			.attr("transform", "translate(0," + this.height + ")")
			.call(this.xAxis);

		this.svg.append("g")
			.attr("class","y lineaxis")
			.call(this.yAxis);



}


module.exports = lineChart;