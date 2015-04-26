var d3 = require('d3');
var DataHelper = require("DataHelper");
var SvgCommon = require('SvgCommon');

function BarChart(el, data, id, size) {
	this.dataHelper = new DataHelper();
	this.initChart(el, data, id, size);
}

BarChart.prototype.initChart = function(el, data, id, size) {
	var self = this;
	this.margin = {top: 0, right: 0, bottom: 20, left: 0};
	this.width = size[0] - this.margin.left - this.margin.right;
	this.height = size[1] - this.margin.top - this.margin.bottom;
	this.svg = d3.select(el)
			.append("svg")
				.attr("width", this.width + this.margin.left + this.margin.right)
				.attr("height", this.height + this.margin.top + this.margin.bottom)
			.append("g")
				.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
				.attr("class","barchart");
	
	this.y = d3.scale.linear().range([this.height,0]);
	this.x = d3.scale.ordinal().rangeRoundBands([0, this.width], .1);

	this.xAxis = d3.svg.axis()
	    .scale(this.x)
	    .orient("bottom");
	// this.colors = SvgCommon.orders;
	// this.yAxis = d3.svg.axis()
	//     .scale(this.y)
	//     .orient("left");

	this.colors = SvgCommon.colors.orders;

	this.update(el, data, id);
}

BarChart.prototype.parse = function(data) {
	this.data =this.dataHelper.BarChart(data);
}
BarChart.prototype.update = function(el,data,id) {
	this.draw(el,data,id);
}

BarChart.prototype.draw = function(el, datas, id) {
	var self = this;
	//Parsing
	this.parse(datas);
	this.max =  d3.max(this.data, function(d) { return d.value });
	this.total = 0;
	_.each(this.data, function(d) {
		self.total += d.value; 
	});
	this.x.domain(this.data.map(function(d) { return d.type }));
	this.y.domain([0, d3.max(this.data, function(d) { return d.value })]);

	this.svg.selectAll('.axis').remove();
	this.svg.selectAll('.midtext').remove();
	this.svg.selectAll('.prct').remove();

	this.svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (this.height) + ")")
		.call(this.xAxis);

	this.bar = this.svg.selectAll(".transactionstatsbar")
			.data(this.data, function(d) { return d.value; });

	this.bar.enter().append("rect")
	    .attr("x", function(d) { return self.x(d.type); })
		.attr("width", self.x.rangeBand())
		.attr("y", function(d) { return self.y(d.value); })
		.attr("height", function(d) { return self.height - self.y(d.value); })
		.style("fill" , function(d) { return self.colors[d.type]; })
		.attr("class","transactionstatsbar");

	this.bar.exit().remove();

	this.num = this.svg.selectAll('.midtext')
				.data(this.data);

	this.num.enter()
		.append('text')
		.attr('class','midtext');

	this.num
		.attr("text-anchor","middle")
		.attr("x", function(d,i) { return (self.x(d.type)+self.x.rangeBand()/2)})
		.attr("y", function(d) { 
			return self.y(self.max*0.2)
		})
		.style("fill", function(d) {
			if ( d.value < self.max*0.3) {
				return "black"
			}
			return "#f5f5f5";
		})
		.text(function(d) {
			return d.value;
		});

	this.prct = this.svg.selectAll('.prct')
				.data(this.data);

	this.prct.enter()
		.append("text")
		.attr('class','prct');

	this.prct
		.attr("text-anchor","middle")
		.attr("x", function(d,i) { return (self.x(d.type)+self.x.rangeBand()/2)})
		.attr("y", function(d) { 
			return self.y(self.max*0.6)
		})
		.style("fill", function(d) {
			if ( d.value < self.max*0.7) {
				return "black"
			}
			return "#f5f5f5";
		})
		.text(function(d) {
			return Math.round((d.value/(self.total)*100))+"%";
		});
	

	// {OfferCreate: 76, AccountSet: 3, Payment: 40, TrustSet: 22, OfferCancel: 35}
}

module.exports = BarChart;