function categorie(){

  this.nav      = $('#nav');
  this.pokemon  = $('.pokemon');
  this.article  = $('#article');

  this.init();

}

categorie.prototype.init = function(){

  var self = this.article;
  
  $(this.nav).on('mouseenter', function(e){
    $(this).removeClass('minNav').addClass('fullNav');
  });

  $(this.nav).on('mouseleave', function(e){
    $(this).removeClass('fullNav').addClass('minNav');
  });

  $(this.pokemon).on('click', function(e){
    $(self).fadeIn(400);
    showModel();
  });

  $(this.article).on('click', '#close', function(e){
    $(self).fadeOut(400);
  });

}