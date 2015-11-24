function Loader(){
	
	this.loader = $('#loader');
	Loader.imgLoaderLength = this.loader.children().length;
	Loader.i = 0;
	
	this.init();
	
}

Loader.prototype.init = function(){
	
	setInterval(this.activateLoader, 200);
	
}

Loader.prototype.activateLoader = function(){
	
	var imgLoader = $('#img-loader' + Loader.i);
	var imgLoaderNext = $('#img-loader' + (Loader.i+1))
	
	imgLoader.removeClass('img-active');
	imgLoaderNext.addClass('img-active');
	
	if(Loader.i == Loader.imgLoaderLength){
		Loader.i = -1;
	}
	
	Loader.i++;  
	
}

var loader = new Loader();