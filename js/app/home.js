// Home
var gen;
var actualGen = 1;
$('#timeline > .time').on('mouseenter', function(){
	if($(this).attr('data-gen')){
		gen = $(this).attr('data-gen');
		$('#generation h3').html(gen);
	}
	
	
	if(gen != "all" && gen != actualGen){
		$('#home .bg').css('display', 'none');
		actualGen = gen;
		var bg = '.bg'+$(this).attr('data-gen');
		var img = bg+' img';
		TweenMax.to($(bg), 0,{display: 'block', opacity: 1});
		TweenMax.staggerFrom($(img), 0.5, {
			x:"-3000px",
			ease: Back.easeOut.config(1.7)
			}, 0.1);
	}
})


$('#timeline').on('mouseenter', '.time', function(){
	var thiss, before, afer;
	thiss = $(this);
	
	var size = $(this).children('div').css('height');
	size = size - 20;
	TweenMax.to(thiss.children('div'), 1, {height: size+'px'});
	
});


var TimeLine = function(){
	
	// Var
	this.sizeIT;
	this.elmt = $('.time');
	
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