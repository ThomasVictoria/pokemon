$('#nav').on('mouseenter', function(e){
	$('#nav').removeClass('minNav').addClass('fullNav');
});

$('#nav').on('mouseleave', function(e){
	$('#nav').removeClass('fullNav').addClass('minNav');
});