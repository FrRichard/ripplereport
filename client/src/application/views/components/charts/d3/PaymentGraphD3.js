var d3 = require('d3');
var DataHelper = require('DataHelper');
var PaymentStore = require('PaymentStore');

function PaymentGraph(el, data, id, size){
	this.init(el, data, id, size);
}


PaymentGraph.prototype.init = function(el, data, id, size) {
	var self = this;
	this.datahelper = new DataHelper();
	this.margin = { top:0, right:0, bottom:0, left:0 };
	// this.width =size[0];
	// this.width = document.getElementById("PaymentChart").offsetWidth;
	this.width = size[0];
	this.height = size[1];
	this.nodes = [];
	this.links = [];
	this.constraints = [];


	this.svg = d3.select(el).append('svg')
	    .attr( 'width', this.width  )
	    .attr( 'height', this.height  )
	    .attr('pointer-events', 'all')
    .append('svg:g')
  //   	.attr('transform',
		// "translate(0,0)"
		// + " scale(1)")
  	    .call(d3.behavior.zoom().on("zoom",redraw))
  	.append('svg:g');

  	this.svg.append('svg:rect')
  		.attr('width', this.width)
  		.attr('height', this.height)
  		.attr('fill','#02061D');

  	function redraw() {
  		self.svg.attr('transform',
		'translate(' + d3.event.translate + ")"
		+ " scale(" + d3.event.scale + ")");
  	}

    // this.force = d3.layout.force();
    // console.log(Cola);
   	this.force = Cola.d3adaptor()
    	// .avoidOverlaps(true)
    	.size([this.width, this.height]);
    
    // this.force.linkDistance(100);
    // this.force.linkStrength(20);

    this.update(el, data, id);

}


PaymentGraph.prototype.parse = function(data) {
	var size = {
		height: this.height,
		width: this.width
	}
	var result = this.datahelper.paymentgraph(data, size);
	return result;

}

PaymentGraph.prototype.draw = function(el, data, id) {
	var self = this;
	// console.log("DRAW!",this.nodes,this.links);
	// this.constraints = {"axis":"y", "left":0, "right":1, "gap":25};

	this.force
		.nodes(this.nodes)
    	.links(this.links)
    	.flowLayout("y", 30)
    	.constraints(this.constraints)
	    .symmetricDiffLinkLengths(40)
	    .start(50,50,50);


	this.link = this.svg.selectAll('.link').data(this.links);
	this.link.enter().append('line').attr('class', 'link');

    this.link.exit().remove();
    // console.log("this.noooooooodeee",this.nodes);
	this.node = this.svg.selectAll('.node').data(this.nodes);

    this.node.enter()
    	.append('circle')
    	.attr('r', (self.width/230))
    	.attr('class', 'node');

    this.node.exit().remove();
    console.log("NODES", this.nodes);
    this.force.on('tick', function() {
	    self.node
	    .attr('cx', function(d) {  
	    	// var x = Math.min(self.width, d.x);
	    	var x  = d.x;
	    	return (x); 
	    })
	    .attr('cy', function(d) { 
	    	// var y = Math.min(self.height, d.y);
	    	var y = d.y;
	    	return (y);
	   	})
	    .attr('fill', function(d) {
	    	if(d.parent == 'origin') {
	    		return 'green';
	    	} else if(d.type == 'gateway') {
	    		d3.select(this).attr("class","gateway");
	    	} else {
	    		return '#ccc';
	    	}
	    })
	    .attr('data-value', function(d) { return d.value; })
	    .attr('data-id', function(d) { return d.id; })
	    .on("mouseover", function(d) {
	    	var self = this;
	    	d3.select(this.parentNode)
	    		.append("svg:text").text(function() {
	    			return  d3.select(self).attr('data-id');
	    		})
	    		.attr('x', function() {
	    			return d3.select(self).attr("cx")*1.025;
	    		})
	    		.attr('y', function() {
	    			return d3.select(self).attr("cy");
	    		})
	    		.attr("id", function() {
	    			return "label-"+d3.select(self).attr("data-id");
	    		})
	    		.attr('fill',  function() {
	    			return 'white';
	    		});
	    })
	    .on("mouseout", function(d) {
	    	d3.select("#label-"+d3.select(this).attr("data-id")).remove();

	    })
	    .on("click", function(d) {
	    	console.log(d3.select(this).classed("selectedNode"));
	    	if(d3.select(this).classed("selectedNode")) {
	    		d3.select(".selectedNode").classed("selectedNode",false);
	    	} else {
	    		d3.select(".selectedNode").classed("selectedNode",false);
	    		d3.select(this).attr("class","selectedNode");
	    	}
	    	var id = d.id;
	    	self.showAddressDetails(PaymentStore.getAll()[id]);
	    });

	    self.link.attr('x1', function(d) {  return d.source.x ; })
        .attr('y1', function(d) { return (d.source.y ); })
        .attr('x2', function(d) { return (d.target.x ); })
        .attr('y2', function(d) { return (d.target.y ); });

	});

	function keepNodesOnTop() {
        $(".node").each(function() {
            var gnode = this.parentNode;
            gnode.appendChild(this);
        });
    }

    this.addNameLabel = function() {
    	// console.log(self.node);
   //  	_.each(self.node[0], function(node,i) {
   //  		d3.select(".paymentgraph > svg").append("svg:text")
	  //   	// .attr("class", "nodeLabel")
			// .attr("x", function() {
			// 	var x = node.getAttribute('cx')*1.025;
			// 	return x;
			// })
			// .attr("y", function() {
			// 	var y = node.getAttribute('cy');
			// 	return y;
			// })
			// .attr('id', function(d){
			// 	return node.getAttribute("data-id");
			// })
		 //    .text(function(d) {
		 //    	// console.log(node.getAttribute('data-value'));
		 //    	// return d.id;
		 //    	// var id = "("+node.getAttribute("data-name") +")" + node.getAttribute('id');
		 //    	var id = node.getAttribute("data-id");
		 //    	return id;
		 //    })
		 //    .attr('fill', function(d) {
		 //    	return "#FFFFF";
		 //    })
		 //    .style("opacity",0);
   //  	});
    }

    this.removeNameLabel = function() {
    	d3.selectAll('.nodeLabel').remove();
    }

    keepNodesOnTop();
    this.force.on('end' , function() {
    	self.addNameLabel();
    });

    this.force.on('start', function() {
    	self.removeNameLabel();
    });

	// this.svg.transition().attr("transform", "translate("+self.width/2+","+self.height/2+") scale(0.5)");


}

PaymentGraph.prototype.showAddressDetails = function(details) {
	console.log("details", details);
	// var details = PaymentStore.getAll()[id];
}

PaymentGraph.prototype.update = function(el, data, id) {
	var self = this;
	console.log("_.updatedatagraph!");
	if(data != null) {
		var newPoints = this.parse(data.nodes);
		// console.log("newPoitns!", newPoints);
		// _.each(newPoints.links, function(link) {
		// 	self.links.push(link);
		// });
		// _.each(newPoints.nodes, function(node) {
		// 	self.nodes.push(node);
		// });
		self.nodes = newPoints.nodes;
		self.links = newPoints.links;
		self.constraints = newPoints.constraints;
		// console.log(self.nodes);

	}

	self.draw(el, data, id);

}



module.exports = PaymentGraph;