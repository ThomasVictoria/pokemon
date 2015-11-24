var resizeContent = function(){
	
	this.size = Math.floor($(window).height() / 3);
	this.view = $('#content').find('.view');
	this.content = $('#content');
	this.contentW;
	
	this.resize();
}

resizeContent.prototype.resize = function(){
  this.view = this.view.length / 3;
  this.contentW = (this.view * (this.size-2));
  this.content.css('width', this.contentW+'px');
}