var adapt = function() {};
adapt.prototype.reorganize = function(ids) {

	var height = $("li[datatype="+ids[0]+"]").attr('data-sizey');
	var row = parseInt($("li[datatype="+ids[0]+"]").attr('data-row'));
	for(i = 1; i<11; i++) {
		console.log($('#keyfact'+i));
		var tochangerow =parseInt($('#keyfact'+i).attr('data-row'));
		var newrow = parseInt(tochangerow -height);
		console.log($('#keyfact'+i).attr('data-row')>row,$('#keyfact'+i).attr('data-row'),row);
		if($('#keyfact'+i).attr('data-row')>row) {
			$('#keyfact'+i).attr('data-row', newrow);
		}
	}

	_.each(ids, function(id) {
		$("li[datatype="+id+"]").attr('data-sizey',1);
		$("li[datatype="+id+"]").attr('data-row',15);
	});
};

module.exports = adapt;