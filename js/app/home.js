// Home
$('#timeline > .time').on('mouseenter', function(){
	if($(this).attr('data-gen')){
		$('#generation h3').html($(this).attr('data-gen'));
	}
})

var TimeLine = function(){
	
	// Var
	this.sizeIT; 
	
	// Function
	this.init();
}

TimeLine.prototype.init = function(){
	this.sizeIT = ($(window).innerWidth() - 140) / 8;

	$('.interTime').css('width', this.sizeIT+'px');
	
	for(var x = 0; x <= this.sizeIT; x+=20){
		$('.interTime').append('<div class="time"><div class="smallTimeL"></div><div class="smallTimeR"></div></div>');
	}
}

new TimeLine();