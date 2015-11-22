$(document).ready(function(){
	
	// var loaderLeft = $('#loader-bg').css('left');
	// var loaderLeftInt = parseInt(loaderLeft);
	var imgLoaderLength = $('#loader').children().length;
	console.log(imgLoaderLength);
	var i = 1;
	
	var loader = function(){
		
		var imgLoader = $('#img-loader' + i);
		var imgLoaderNext = $('#img-loader' + (i+1))
		
		imgLoader.removeClass('img-active');
		imgLoaderNext.addClass('img-active');
		
		if(i == imgLoaderLength){
			i = -1;
		}
		
		i++;
	}
	
	setInterval(loader, 400);
	
});