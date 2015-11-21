$('#nav').on('mouseenter', function(e){
	$('#nav').removeClass('minNav').addClass('fullNav');
});

$('#nav').on('mouseleave', function(e){
	$('#nav').removeClass('fullNav').addClass('minNav');
});

$('.pokemon').on('click', function(e){
	$('#article').fadeIn(400);
});

$('#article').on('click', '#close', function(e){
	$('#article').fadeOut(400);
});