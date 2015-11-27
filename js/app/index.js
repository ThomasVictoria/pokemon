function Home(){

  this.home       = $('#home');
  this.logo       = $('.logo');
  this.bg         = $('.bg');
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
        $('.pokemon').removeClass('hide filters');
        $('.pokemon').removeClass('view filters');
      } 
    }


    var filters = Array();

    $('#categorie ul .point.select').each(function(){

      filters.push($(this).attr('data-name'));      

    });

    $.getJSON( "../../data/types.json", function(data){

      selfFunction(filters, data);

    });


  });

}

Home.prototype.applyFilters = function(filters, data){

  var pokemonFiltered = Array();

  for(i=1; i < Object.keys(data).length+1; i++){

    if(filters.length == 0){

      $('.pokemon').each(function(){

        if($(this).hasClass('cache')){
          $(this).addClass('hide');
        }

      });

    }

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

        if(filters.length > 1)
          usedArray = results;
        else
          usedArray = sortedPokemons;

        $('.pokemon').addClass('hide filters');
        $('.pokemon').removeClass('view filters');

        for(w=0; w < usedArray.length; w++){

          $('.pokemon[data-id='+usedArray[w]+']').removeClass('hide filters');
          $('.pokemon[data-id='+usedArray[w]+']').addClass('view filters');

        }

      }

    }  

  }
  
  //   Get the size of the content
  new resizeContent();
  //   Size of the content
  
}

Home.prototype.toGen = function(){

  var self = this.categorie;
  var home = this.home;
  
  $(this.bg).on('click', function(e){
    TweenMax.fromTo(home, 1, {left:0,display:'block', opacity:'1'},{left:'-100%', display:"none", opacity:'0'});
    TweenMax.fromTo(self, 1, {right:"100%", display:'none', opacity:'0'},{left:0, display:"block", opacity:'1'});
    $('#version').html($('#generation h3').html());
  });
  
  $(this.logo).on('click', function(){
    if($(home).css('display') == 'block'){
      TweenMax.fromTo(home, 1, {left:0,display:'block', opacity:'1'},{left:'-100%', display:"none", opacity:'0'});
      TweenMax.fromTo(self, 1, {right:"100%", display:'none', opacity:'0'},{left:0, display:"block", opacity:'1'});
      $('#version').html('All');
    }else{
      $('#content').empty();
      TweenMax.fromTo(self, 1, {left:0,display:'block', opacity:'1'},{right:'100%', display:"none", opacity:'0'});
      TweenMax.fromTo(home, 1, {left:"-100%", display:'none', opacity:'0'},{left:0, display:"block", opacity:'1'});
    }
  })

}

Home.prototype.CallPokemons = function(){
  
  var self = this.categorie;

  $(this.bg).on('click', function(){
    var generation = $('#generation h3').html();
    var pokedex = new call('pokedex', generation, Display);
  });
  
  $(this.logo).on('click', function(){
    if($(home).css('display') == 'block'){
      var pokedex = new call('pokedex', 'all', Display);
    }
  });

}

function Display(data){

  var content  = $('#content');
  content.html('');
  var child = Math.ceil((Object.keys(data.reponse)).length / 3);
  
  // Height pokemon elmt
  
   var size = Math.floor($(window).height() / 3);
  
  // Height pokemon elmt
  for(i = 0; i < Object.keys(data.reponse).length; i++){

    $(content).append('<div class="pokemon view" style="width:'+(size-2)+'px;height:'+(size-2)+'px;"data-id="'+ data.reponse[i].id +'" data-name="'+data.reponse[i].name+'"><div class="image"><img src="assets/images/' + data.reponse[i].name + '.png" /></div></div>');

  };

  //   Get the size of the content
  new resizeContent();
  //   Size of the content

  
  //  Gère le scroll
  VS = new vScroll();

  var showCategorie = new categorie();

  raf();
}

var VS;

function raf(){
  VS.update();
  if(!stopScroll){
    window.requestAnimationFrame(raf);
  }
};
var stopScroll = true;

new Home();