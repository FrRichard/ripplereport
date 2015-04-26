var d3 = require('d3');
var DataHelper = require("DataHelper");
var SvgCommon = require('SvgCommon');
var moment = require('moment');

function barChart(el, data, id, size) {
	this.initChart(el, data, id, size);
}

barChart.prototype.initChart = function(el, data, id, size) {
	console.log("uuuuuuuuuuuuu",el,data,id,size);
	this.margin = { top:0, right:0, bottom:0, left:0 };
	this.width =size[0];
	this.height =size[1];

	this.svg = d3.select(el)
		.append("svg")
			.attr("width", this.width + this.margin.left + this.margin.right)
			.attr("height", this.height + this.margin.top + this.margin.bottom)
		.append("g")
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
			.attr("class","barchart2");

	this.y = d3.scale.log().range([this.height,0]);

	this.update(el, data, id);
}

barChart.prototype.update = function(el, data, id, size) {
	this.draw(el, data, id);
}

barChart.prototype.draw = function(chartId,data) {
	var self = this;

}


module.exports = barChart;