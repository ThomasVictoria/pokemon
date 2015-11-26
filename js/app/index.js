function Home(){

  this.home      = $('#home');
  this.categorie = $('#categorie');

  this.init();

}
console.log('yolo');
Home.prototype.init = function(){

  this.toGen();
  this.CallPokemons();

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

    $(content).append('<div class="pokemon">'+ data.reponse[i].name +'</div>');

  };
  
  vScroll = new vScroll();

  (function raf(){
    vScroll.update();
    window.requestAnimationFrame(raf);
  })();
  
}


var home = new Home();

