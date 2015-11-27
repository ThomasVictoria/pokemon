function DisplayMove(data){

  new Move(data.reponse);

}

function Move(data){

  this.data   = data;
  this.detail = $('#move .container .caracteristique');

  this.init();

}

Move.prototype.init = function(){

  this.clear();
  this.show();

}

Move.prototype.clear = function(){

  $(this.detail).children().each(function(){

    $(this).empty();

  });

}

Move.prototype.show = function(){

  var self    = this.data,
      selfFun = this.pokemon,
      selfid  = self.id,
      json    = $.getJSON('../../data/moves.json');

  $(this.detail).children('h2').html(self.name);

  $.when(json).done(function(json){

    selfFun(json[selfid]);

  });

}

Move.prototype.pokemon = function(json){

   new call('pokedex', 'all', DisplayPokemon, json);
};







