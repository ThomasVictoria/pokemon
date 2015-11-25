var resizeContent = function(){
	
	this.size = Math.floor($(window).height() / 3);
	this.view = $('#content').find('.view');
	this.divView = $('#content').find('.view');
	this.content = $('#content');
	this.contentW;
	
	this.resize();
	this.razScroll();
}

resizeContent.prototype.resize = function(){
  stopScroll = !stopScroll;
  this.view = this.view.length / 3;
  this.contentW = (this.view * (this.size-2));
  this.content.css('width', this.contentW+'px');
}

resizeContent.prototype.razScroll = function(){
  TweenMax.staggerFrom(this.divView, 0.5,{opacity: 0, x:-300, delai:0.5});
	if(stopScroll){
		TweenMax.from(this.content, 1, {
			transform:"translateX(0)",
			ease: Power1.easeIn, 
			onComplete:completeRazScroll
			});
		
	}
}

function completeRazScroll(){
	stopScroll = false;
	VS.raz();
	raf();
}