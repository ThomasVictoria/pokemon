function Home(){

  this.home      = $('#home');
  this.categorie = $('#categorie');

  this.init();

}

Home.prototype.init = function(){

  this.toGen();
  this.CallPokemons();

}

Home.prototype.toGen = function(){

  var self = this.categorie;

  $(this.home).on('click', function(e){
    $(this).fadeOut();
    $(self).fadeIn();
    $('#version').html($('#generation h3').html());
  });

}

Home.prototype.CallPokemons = function(){

  $(this.home).on('click', function(){

    var generation = $('#generation h3').html();

    var pokedex = new call('pokedex', generation, Display);

  });

}

function Display(data){

  console.log(data);

  var content  = $('#content');
  var child = Math.ceil((Object.keys(data.reponse).length / 3));
  
  var contentW = (child * 272);
  
  $('#content').css('width', contentW+'px');
  for(i = 0; i < Object.keys(data.reponse).length; i++){

    $(content).append('<div class="pokemon" data-id="'+ data.reponse[i].id +'">'+ data.reponse[i].name +'</div>');
 
  };
  
  vScroll = new vScroll(child);
  var showCategorie = new categorie();

  (function raf(){
    vScroll.update();
    window.requestAnimationFrame(raf);
  })();
  
}

var home = new Home();

