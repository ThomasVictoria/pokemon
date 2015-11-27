function DisplayAbility(data){
  
  new Ability(data);
  
}

function Ability(data){

  this.data   = data;
  this.detail = $('#ability .container .caracteristique');

  this.init();

}

Ability.prototype.init = function(){

  this.clear();
  this.show();

}

Ability.prototype.clear = function(){

  $(this.detail).children().each(function(){

    $(this).empty();

  });

}

Ability.prototype.show = function(){

  var self    = this.data,
      selfFun = this.pokemon,
      selfid  = self.reponse.id,
      json    = $.getJSON('http://thomasvictoria.fr/pokemon/data/ability.json');
  
  $(this.detail).children('h2').html(self.name);

  $.when(json).done(function(json){

    selfFun(json[selfid]);

  });

}

Ability.prototype.pokemon = function(json){
  
  new call('pokedex', 'all', DisplayPokemon, json);

};