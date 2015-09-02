var d3 = require('d3');
var DataHelper = require("DataHelper");
var SvgCommon = require('SvgCommon');

function OffersExercisedTotal(chartId, data) {
	this.dataHelper = new DataHelper();
	this.initChart(chartId);
} 

OffersExercisedTotal.prototype.initChart = function(chartId) {
	var self = this;
	this.colors = SvgCommon.colors.orders;

	this.x = d3.scale.linear().range([0,300]);

}

OffersExercisedTotal.prototype.parse = function(data) {

}

OffersExercisedTotal.prototype.draw = function(chartId, data) {
	var self = this;
	this.x.domain([0, d3.max(data.summary.amount)])
	data=[data.summary.amount];
	d3.select("#"+chartId)
		.selectAll("div")
		.data(data)
		.enter().append("div")
		.style("width", function(d) { return self.x(d) + "px"; })
		.style("background-color", function(d) { return "steelblue"; })
		.attr('id',chartId)
		.text(function(d) { return d; });
}

OffersExercisedTotal.prototype.remove = function(chartId) {
	d3.select('#'+chartId).selectAll('div').remove();
}

module.exports = OffersExercisedTotal;