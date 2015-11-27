function Navigation(){

  this.type      = $('a .type');
  this.move      = $('a .move');
  this.ability   = $('a .ability');
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
        TweenMax.fromTo($(selfAbility), 1,{'left': '100%', display: 'none'}, {left: '0%', display: 'block'});


    var id = $(this).attr('data-id');
    new call('ability', id, DisplayAbility);

  });

  $(this.move).on('click', function(e){
        TweenMax.fromTo($(selfMove), 1,{'left': '100%', display: 'none'}, {left: '0%', display: 'block'});


    var id = $(this).attr('data-id');
    new call('move', id, DisplayMove);

  });

  $(this.type).on('click', function(e){
        TweenMax.fromTo($(selfType), 1,{'left': '100%', display: 'none'}, {left: '0%', display: 'block'});


    var id = $(this).attr('data-id');
    new call('type', id, DisplayType);

  });

}