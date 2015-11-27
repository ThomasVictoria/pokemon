$('#search').on('click', function(e){
	TweenMax.to($(this), 0.5,{width: '15%', delai:0.5, ease: Elastic.easeOut.config(1, 0.3)});
});