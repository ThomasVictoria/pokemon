function DisplayData(data){

  new pokearticle(data);

}

var pokearticle = function(data){

  this.data = data;

  this.article = $('#article');
  this.td = $('#article').find('td');

  this.init();

}

pokearticle.prototype.init = function(){

  this.show();
  this.moveability();

}

function desc(data){

  $(this.article).find('p').html(data.reponse.description);

}

pokearticle.prototype.show = function(){

  $('.spec').children().each(function(){

      $(this).children('span').empty();

  });

  this.article.find('h2').html(this.data.reponse.name);

  var link         = this.data.reponse.descriptions[0].resource_uri,
      delimiter    = '/',
      start        = 4,
      tokens       = link.split(delimiter).slice(start),
      step         = tokens.join(delimiter),
      lenght       = step.length,
      id           = step.slice(0,lenght -1);

  new call('description', id, desc);

  $('.spec .vitesse span').append(this.data.reponse.speed);
  $('.spec .vitesse').css('height', (this.data.reponse.speed*100)/180+'%');
  $('.spec .vitesse').css('top', 100-((this.data.reponse.speed*100)/180)+'%');
  $('.spec .attack span').append(this.data.reponse.attack);
  $('.spec .attack').css('height', (this.data.reponse.attack*100)/180+'%');
  $('.spec .attack').css('top', 100-((this.data.reponse.attack*100)/180)+'%');
  $('.spec .spe_attack span').append(this.data.reponse.sp_atk);
  $('.spec .spe_attack').css('height', (this.data.reponse.sp_atk*100)/180+'%');
  $('.spec .spe_attack').css('top', 100-((this.data.reponse.sp_atk*100)/180)+'%');
  $('.spec .defense span').append(this.data.reponse.defense);
  $('.spec .defense').css('height', (this.data.reponse.defense*100)/230+'%');
  $('.spec .defense').css('top', 100-((this.data.reponse.defense*100)/230)+'%');
  $('.spec .hp span').append(this.data.reponse.hp);
  $('.spec .hp').css('height', (this.data.reponse.hp*100)/255+'%');
  $('.spec .hp').css('top', 100-((this.data.reponse.hp*100)/255)+'%');
  $('.spec .spe_def span').append(this.data.reponse.sp_def);
  $('.spec .spe_def').css('height', (this.data.reponse.sp_def*100)/230+'%');
  $('.spec .spe_def').css('top', 100-((this.data.reponse.sp_def*100)/230)+'%');

}

pokearticle.prototype.moveability = function(){

  var self          = this.data,
      localSelector = this,
      selfFun       = this.display,
      selfid        = self.reponse.national_id,
      ability       = $.getJSON('../../data/ability.json'),
      moves         = $.getJSON('../../data/moves.json'),
      type          = $.getJSON('../../data/types.json');

  showModel(self.reponse.name);

  $('#weight').html('Weight : '+self.reponse.weight);
  $('#height').html('Height : '+self.reponse.height);
  $('#categories').html('Categories : '+self.reponse.species);

  $(this.detail).children('h2').html(self.reponse.name);


  $.when(ability, moves, type).done(function(ability, moves, type){

    selfFun(ability[0], moves[0], type[0], selfid, localSelector);

  });
}

pokearticle.prototype.display = function(ability, moves, type, pokemonId, localSelector){

  $('#abilities, #moves, #types').empty();

  $('#abilities').append('Abilities : ');

  $('#moves').append('Moves : ');



  for(i=1; i < Object.keys(ability).length; i++){

    for(x=0; x < Object.keys(ability[i].pokemons).length; x++){

      if(ability[i].pokemons[x] == pokemonId){

        var link      = ability[i].resource_uri,
            delimiter = '/',
            start     = 4,
            tokens    = link.split(delimiter).slice(start),
            step      = tokens.join(delimiter),
            lenght    = step.length,
            id        = step.slice(0,lenght -1);

        $('#abilities').append('<a href="#"><span class="ability" data-id="'+id+'" >'+ ability[i].name +'</span></a>')
      }

    }

  }

  for(y=1; y < Object.keys(moves).length; y++){

    if(y != 165){

      for(z=1; z < Object.keys(moves[y].pokemons).length; z++){

        if(moves[y].pokemons[z] == pokemonId){

          var link      = moves[y].resource_uri,
              delimiter = '/',
              start     = 4,
              tokens    = link.split(delimiter).slice(start),
              step      = tokens.join(delimiter),
              lenght    = step.length,
              id        = step.slice(0,lenght -1);

          $('#moves').append('<a href="#"><div class="ability" data-id="'+id+'" >'+ moves[y].name +'</div></a>')
        }

      }

    }

  }

  for(y=1; y < Object.keys(type).length; y++){

    if(y != 165){

      for(z=1; z < Object.keys(type[y].pokemons).length; z++){

        if(type[y].pokemons[z] == pokemonId){

          var link      = type[y].resource_uri,
              delimiter = '/',
              start     = 4,
              tokens    = link.split(delimiter).slice(start),
              step      = tokens.join(delimiter),
              lenght    = step.length,
              id        = step.slice(0,lenght -1);

          $('#types').append('<a href="#"><span class="type" data-id="'+id+'" ><img src="assets/pokemon_type/'+ type[y].name +'.png"></span></a>')
        }

      }

    }

  }

  new Navigation();

}






