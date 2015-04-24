var d3 = require("d3");
var DataHelper = require("DataHelper");
var SvgCommon = require('SvgCommon');
var React = require('react');

function PieChart(el,data,id,size) {
	this.initChart(el,data,id,size);
}


PieChart.prototype.initChart = function(el,data,id,size) {
	var self = this;
	this.width = size[0];
	this.height = size[1];
	this.margin = {top: 0, right: 40, bottom: 0, left: 60};
	this.radius = Math.min(this.width,this.height)/2;
	this.labelRadius = this.width*0.35;
	this.svg = d3.select(el).append("svg")
			.attr("width", self.width + this.margin.right + this.margin.left)
			.attr("height",self.height + this.margin.top + this.margin.bottom)
			// .attr("class","PieChart_bignumber")
		.append("g")
			.attr("transform", "translate("+ (self.width/2 +self.margin.left) + "," + self.height/2 + ")");
			// .attr("transform", "translate("+ self.margin.left + "," + self.margin.top + ")");
			
	this.colors = SvgCommon.colors.currencies;
	
	this.arc = d3.svg.arc()
		.outerRadius(this.radius-40)
		.innerRadius(25);

	this.update(el,data,id);
}

PieChart.prototype.update = function(el,data,id) {
	this.draw(el,data,id);
}

PieChart.prototype.draw = function(el,datas,id) {
	var self = this;
	this.dota = datas;
	this.id = id;
	this.total = 0;
	_.each(this.dota, function(d) {
		self.total += d.amount;
	});

	this.pie = d3.layout.pie()
		.sort(null)
		.value(function(d) {  return d.amount });

	// removing former label
	this.svg.selectAll(".pieoverviewlabels").remove();

	this.svg.selectAll('g .arc').remove();
		
	this.g = this.svg.selectAll(".arc")
			.data(this.pie(self.dota));

	this.g.enter().append("g")
		.attr("class","arc");



	this.g.append("path")
			.attr("d",this.arc)
			.style("fill", function(d) { 
				if(d.data.type == "Cash In") {
					return "#339933";
				} else if(d.data.type == "Cash Out") {
					return "#b01e2e";
				} else {
					return "#124A51";
				}
			 } )
			.on("mouseover" , function() {
				d3.selectAll("#"+self.id +" .arc").style("opacity",0.5);
				d3.select(this.parentNode).style("opacity",1);
				d3.select(this.parentNode).selectAll(".piecharthiddenLabel").style("visibility","visible");
			})
			.on("mouseout", function() {
				d3.selectAll("#"+self.id +" .arc").style("opacity",1);
				d3.select(this.parentNode).selectAll(".piecharthiddenLabel").style("visibility","hidden");
			});

	this.g.append("text")
		// .attr("text-anchor", function(d) {
		//     // are we past the center?
		//     return (d.endAngle + d.startAngle)/2 > Math.PI ? "end" : "start";
		// })	
		.text(function(d) {
			return d.data.type;
		})
		.attr("transform", function(d) {
		    var c = self.arc.centroid(d),
		        x = c[0],
		        y = c[1],
		        // pythagorean theorem for hypotenuse
		        h = Math.sqrt(x*x + y*y);
		    return "translate(" + (x/h * self.labelRadius) +  ',' +
		       (y/h * self.labelRadius) +  ")"; 
		})
		.attr("text-anchor", function(d) {
    		// are we past the center?
    		return (d.endAngle + d.startAngle)/2 > Math.PI ?
        	"end" : "start";
		})
		.attr("class","piecharthiddenLabel")
		.append('tspan').text(function(d) {
			var prct = Math.trunc((d.data.amount/self.total)*10000)/100;
			return prct+"%";
		})
		.attr("text-anchor", function(d) {
    		// are we past the center?
    		return (d.endAngle + d.startAngle)/2 > Math.PI ?
        	"end" : "start";
		})
		.attr('x',0)
		.attr('dy',15)
		.attr("class","piecharthiddenLabel");


	// this.g.exit().remove();
};


PieChart.prototype.remove = function(el) {
	// d3.select(el).remove();
};


module.exports = PieChart;