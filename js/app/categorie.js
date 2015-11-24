function categorie(){

  this.nav       = $('#nav');
  this.pokemon   = $('.pokemon');
  this.type      = $('a div.type');
  this.move      = $('a div.move');
  this.ability   = $('a div.ability');
  this.articleP  = $('.popup#article');
  this.articleA  = $('.popup#ability');
  this.articleT  = $('.popup#type');
  this.articleM  = $('.popup#move');
  this.close     = $('.close');
  this.popup     = $('.popup');

  this.init();

}

categorie.prototype.init = function(){

  this.MenuBar();
  this.callAjax();

}

categorie.prototype.MenuBar = function(){


  $(this.nav).on('mouseenter', function(e){
    $(this).removeClass('minNav').addClass('fullNav');
  });

  $(this.nav).on('mouseleave', function(e){
    $(this).removeClass('fullNav').addClass('minNav');
  });

}

categorie.prototype.callAjax = function(){

  var selfPokemon = this.articleP;
  var selfMove    = this.articleM;
  var selfAbility = this.articleA;
  var selfType    = this.articleT;
  var selfPopup   = this.popup;

  $(this.pokemon).on('click', function(e){
    $(selfPokemon).fadeIn(400);

    var name = $(this).html(),
        id   = $(this).attr('data-id');
    showModel(name);
    var Data = new call('pokemon', id, DisplayData);

  });

  $(this.ability).on('click', function(e){
    $(selfAbility).fadeIn(400);

    var id = $(this).attr('data-id');
    new call('ability', id, DisplayType);

  });

  $(this.move).on('click', function(e){
    $(selfMove).fadeIn(400);

    var id = $(this).attr('data-id');
    new call('move', id, DisplayType);

  });

  $(this.type).on('click', function(e){
    $(selfType).fadeIn(400);

    var id = $(this).attr('data-id');
    new call('type', id, DisplayType);

  });

  $(this.close).on('click', function(e){
    $(selfPopup).fadeOut(400);
  });

}