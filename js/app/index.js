//Exemple utilisation fonction ajax : 

var pokedex = new call('pokedex', '5', yolo);

function yolo(data) {

  console.log(data);

}


function Home(){

  this.home      = $('#home');
  this.categorie = $('#categorie')

  this.init();

}

Home.prototype.init = function(){

  this.toGen();
  this.DisplayPokemons();

}

Home.prototype.toGen = function(){

  var self = this.categorie;
  
  $(this.home).on('click', function(e){
    $(e).fadeOut();
    $(self).fadeIn();
  });

}

Home.prototype.DisplayPokemons = function(){
  
  $(this.home).on('click', function(){
    
    
    
  });
  
}