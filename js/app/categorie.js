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
    TweenMax.fromTo($('#loader-container'), 1,{display: 'block', opacity: 1}, {opacity: '0', display: 'none', delay:0.9});
    TweenMax.fromTo($(selfPokemon), 1,{'left': '-100%', display: 'block'}, {left: '0%', display: 'block', delay:1});
    var name = $(this).attr('data-name'),
        id   = $(this).attr('data-id');
    showModel(name);
    var Data = new call('pokemon', id, DisplayData);

  });

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

  $(this.close).on('click', function(e){
    stopScroll = false;
    raf();
    TweenMax.fromTo($(this).parent().parent().parent(), 1,{'left': '0%', display: 'block'}, {left: '100%', display: 'none'});
    var context = $(this).parent().find('caracteristique');
    $(context).children('.image').empty();
    $(context).children('.tableEffect').children('.innteraction').each(function(){
      
      $(this).empty();
      
    });
    $(context).children('.pokemons').empty();
    $(context).children('h2').empty();
    
  });
  
  $(this.pokemon).on('click', function(e){
    stopScroll = false;
    raf();
    console.log($(this));
    new TweenMax.to($('#ability, #type, #move'), 1, {left: '100%', display: 'none'});
    var context = $('#ability, #type, #move');
    $(context).children('.image').empty();
    $(context).children('.tableEffect').children('.innteraction').each(function(){
      
      $(this).empty();
      
    });
    $(context).children('.pokemons').empty();
    $(context).children('h2').empty();
    
  });

}