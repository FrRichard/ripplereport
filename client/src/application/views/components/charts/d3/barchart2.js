var d3 = require('d3');
var DataHelper = require("DataHelper");
var SvgCommon = require('SvgCommon');
var moment = require('moment');

function lineChart(chartId) {
	this.initChart(chartId);
}

lineChart.prototype.initChart = function(chartId) {
	this.margin = { top:30, right:0, bottom:90, left:100 };
	this.width =600;
	this.height =220;
	// this.x = d3.time.scale().range([0,this.width]);
	this.x = d3.scale.ordinal().rangeRoundBands([0, this.width], 0.5);
	// this.y = d3.scale.linear().range([this.height,0]);
	this.y = d3.scale.log().range([this.height,0]);

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
	console.log("nesteddataaaaaaaaaaaaaa",this.nestedData);


	console.log("linechartdataaaaaaaaaaa",data);
	this.xAxis = d3.svg.axis().scale(this.x).orient("bottom");
	this.yAxis = d3.svg.axis().scale(this.y).orient("left").ticks(5);

	// this.valueline = d3.svg.line()
	// 	// .interpolate("monotone")
	// 	.x(function(d) { return this.x(Date.parse(d.time)); })
	// 	.y(function(d) { return this.y(d.amount); });

		this.svg = d3.select('#'+chartId)
			.append("svg")
				.attr("width", this.width + this.margin.left - this.margin.right)
				.attr("height", this.height - this.margin.top + this.margin.bottom)
			.append("g")
				.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

		this.x.domain(this.data.map(function(d) { return d.time;}));
		// this.y.domain([0, d3.max(this.data, function(d) { return d.amount;})]);
		this.y.domain([1, d3.max(this.data, function(d) { return d.amount;})]);

		// this.svg.append("path").attr("d", this.valueline(this.data));
		this.bar = this.svg.selectAll('.transactionsbar')
			.data(this.data);

		this.bar.enter().append("rect")
		    .attr("x", function(d) { return self.x(d.time); })
			.attr("width", self.x.rangeBand())
			.attr("y", function(d) { return self.y(d.amount); })
			.attr("height", function(d) { return self.height - self.y(d.amount); })
			.style("fill" , "steelblue")
			.attr("class","transactionbar");

		this.svg.append("g")
			.attr("class", "x lineaxis")
			.attr("transform", "translate(0," + this.height + ")")
			.call(this.xAxis);

		this.svg.append("g")
			.attr("class","y lineaxis")
			.call(this.yAxis);


	// console.log("dataaaaaaaaaaaaa",data);

}


module.exports = lineChart;