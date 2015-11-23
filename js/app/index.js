function Home(){

  this.home       = $('#home');
  this.categorie  = $('#categorie');
  this.menu       = $('#nav ul');
  this.menuButton = $('#categorie ul .point');

  this.init();

}

Home.prototype.init = function(){

  this.toGen();
  this.CallPokemons();
  this.filters();

}

Home.prototype.filters = function(){

  var self         = this.menuButton,
      selfFunction = this.applyFilters;

  $(this.menuButton).on('click', function(){

    if($(this).hasClass('empty')){
      $(self).addClass('unselect');
      $(this).addClass('select');
      $(this).removeClass('unselect');
      $(self).removeClass('empty');
    }else if($(this).hasClass('unselect')){
      $(this).addClass('select');
      $(this).removeClass('unselect');
    }else if($(this).hasClass('select')){
      $(this).addClass('unselect');
      $(this).removeClass('select');
      if($(self).hasClass('select') === false && $(self).hasClass('empty') === false){
        $(self).addClass('empty');
        $(self).removeClass('select');
        $(self).removeClass('unselect');
      } 
    }

    var filters = Array();

    $('#categorie ul .point.select').parent().each(function(){

      filters.push($(this).find('.text').html());

    });

    $.getJSON( "../../data/types.json", function(data){

      selfFunction(filters, data);

    });


  });

}

Home.prototype.applyFilters = function(filters, data){

  var pokemonFiltered = Array();

  for(i=1; i < Object.keys(data).length; i++){

    for(y=0; y < filters.length; y++){

      if(filters[y] == data[i].name){

        $('.pokemon').each(function(){

          for(z=0; z < Object.keys(data[i].pokemons).length; z++){

            if($(this).attr('data-id') == data[i].pokemons[z]){

              pokemonFiltered.push($(this).attr('data-id'));

            }

          }

        });

        var sortedPokemons = pokemonFiltered.sort(function(a, b) {
          return a - b;
        });
        var results = [];
        for (b = 0; b < sortedPokemons.length - 1; b++) {
          if (sortedPokemons[b + 1] == sortedPokemons[b]) {
            results.push(sortedPokemons[b]);
          }
        }
        
        console.log(sortedPokemons);
        console.log(results);
        
        if(filters.length > 1)
          usedArray = results;
        else
          usedArray = sortedPokemons;

//        console.log(usedArray);
        
        $('.pokemon').addClass('hide');
        $('.pokemon').removeClass('view');

        for(w=0; w < usedArray.length; w++){

          $('.pokemon[data-id='+usedArray[w]+']').removeClass('hide');
          $('.pokemon[data-id='+usedArray[w]+']').addClass('view');

        }

      }

    }  

  }

}



Home.prototype.toGen = function(){

  var self = this.categorie;

  $(this.home).on('click', function(e){
    $(this).fadeOut();
    $(self).fadeIn();
  });

}

Home.prototype.CallPokemons = function(){

  $(this.home).on('click', function(){

    var generation = $('h3').html();

    var pokedex = new call('pokedex', generation, Display);

  });

}

function Display(data){

  console.log(data);

  var content  = $('#content');

  for(i = 0; i < Object.keys(data.reponse).length; i++){

    $(content).append('<div class="pokemon" data-id="'+ data.reponse[i].id +'">'+ data.reponse[i].name +'</div>');

  };

  vScroll = new vScroll();
  var showCategorie = new categorie();

  (function raf(){
    vScroll.update();
    window.requestAnimationFrame(raf);
  })();

}

var home = new Home();

