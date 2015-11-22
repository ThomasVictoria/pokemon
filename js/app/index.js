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

  for(i=1; i < Object.keys(data).length; i++){

    for(y=0; y < filters.length; y++){

      if(filters[y] == data[i].name){

        for(z=0; z < Object.keys(data[i].pokemons).length; z++){

          $('.pokemon').each(function(){

            if($(this).attr('data-id') != data[i].pokemons[z]){
              $(this).addClass('hide');
              $(this).removeClass('view');
            }
            else{
              $(this).addClass('view');  
              $(this).removeClass('hide') ; 
            }

          });

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

