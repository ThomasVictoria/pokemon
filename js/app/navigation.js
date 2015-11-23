function Navigation(){

  this.type      = $('a div.type');
  this.move      = $('a div.move');
  this.ability   = $('a div.ability');
  this.articleP  = $('.popup#article');
  this.articleA  = $('.popup#ability');
  this.articleT  = $('.popup#type');
  this.articleM  = $('.popup#move');
  
  this.init();

}


Navigation.prototype.init = function(){

  var selfPokemon = this.articleP;
  var selfMove    = this.articleM;
  var selfAbility = this.articleA;
  var selfType    = this.articleT;

  $(this.ability).on('click', function(e){
    $(selfAbility).fadeIn(400);

    var id = $(this).attr('data-id');
    new call('ability', id, DisplayAbility);

  });

  $(this.move).on('click', function(e){
    $(selfMove).fadeIn(400);

    var id = $(this).attr('data-id');
    new call('move', id, DisplayMove);

  });

  $(this.type).on('click', function(e){
    $(selfType).fadeIn(400);

    var id = $(this).attr('data-id');
    new call('type', id, DisplayType);

  });

}