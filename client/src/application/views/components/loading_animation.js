var Loading = {

	gif: function(el,isloading) {
		// console.log(el);
		if(isloading) {
			// console.log("this shit is loading");
			$('#'+el+'>.panel>.panel-heading').append('<img src="../img/loading.gif" class="loader_gif"/>');
			$('.loader_gif').css('opacity',0.6);
		} else {
			// console.log("this shit NOT loading");
			$('.loader_gif').remove();
		}
	}


}

module.exports = Loading;