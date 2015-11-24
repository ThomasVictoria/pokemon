function SearchField(){

  this.field = $('form #search');

  this.inputOnKeydown();

}

SearchField.prototype.inputOnKeydown = function(){

  var type         = $.getJSON('../../data/types.json'),
      abitily      = $.getJSON('../../data/ability.json'),
      move         = $.getJSON('../../data/moves.json');

  var self       = this.init;
  var selfSecond = this.DisplaySearch;
  var nav        = this.navigationSearch;


  $(this.field).keyup(function(e){

    var InputValue = $(this).val();

    $.when(type,abitily,move,InputValue,selfSecond).done(function(type, ability, move, value, selfSecond){

      self(type[0], ability[0], move[0], value, selfSecond);

    });

  });

}

SearchField.prototype.init = function(type, ability, move, value, callback){

  var index  = [type, ability, move],
      result = $('.searchField .results'),
      Vallenght = value.length;

  $(result).empty();

  for(i=0; i < 3;i++){

    if(i == 0)
      $(result).append('<div class="title">Types</div>');
    else if(i == 1)
      $(result).append('<div class="title">Ability</div>');
    else if(i == 2)
      $(result).append('<div class="title">Move</div>');

    for(y=1; y <= Object.keys(index[i]).length; y++){

      if(index[i][y] != undefined){

        var name      = index[i][y].name,
            link      = index[i][y].resource_uri,
            delimiter = '/',
            start     = 4,
            tokens    = link.split(delimiter).slice(start),
            step      = tokens.join(delimiter),
            lenght    = step.length,
            id        = step.slice(0,lenght -1),
            cutName   = name.substring(0, Vallenght);

        if(value.toUpperCase() === cutName.toUpperCase()){
          callback(name, id, i);
        }

        $('.pokemon').each(function(){

          if(Vallenght == 0){
            if($(this).hasClass('filters') && $(this).hasClass('cache')){
              $(this).removeClass('hide');
              $(this).addClass('view');
            }
            else if($(this).hasClass('hide') && $(this).hasClass('cache')){
              $(this).removeClass('hide');
              $(this).removeClass('cache');
            }
          }

          var Pokemon      = $(this).html(),
              cutPokemon   = Pokemon.substring(0, Vallenght);

          if(value.toUpperCase() === cutPokemon.toUpperCase()){
            if($(this).hasClass('cache')&& $(this).hasClass('filters')){
              $(this).removeClass('cache');
              $(this).removeClass('hide');
              $(this).addClass('view');
            }
          }
          else{
            $(this).addClass('cache');
            $(this).addClass('hide');
            $(this).removeClass('view');
          }

        });

      }
    }

  }
  
  //   Get the size of the content
  new resizeContent();
  //   Size of the content

  if(Vallenght == 0){
    $(result).empty();
  }

  new Navigation();

}

SearchField.prototype.DisplaySearch = function(name, data, id){

  var result  = $('.searchField .results');

  if(id == 0)
    $(result).append('<a href="#"><div class="type" data-id="'+ data +'">'+ name +'</div></a>');
  else if(id == 1)
    $(result).append('<a href="#"><div class="ability" data-id="'+ data +'">'+ name +'</div></a>');
  else if(id == 2)
    $(result).append('<a href="#"><div class="move" data-id="'+ data +'">'+ name +'</div></a>');

}

new SearchField();
