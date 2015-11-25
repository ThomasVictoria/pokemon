function DisplayData(data){

  var popo = new pokearticle(data);

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

pokearticle.prototype.show = function(){

  console.log(this.data.reponse);
  
  this.article.find('h2').html(this.data.reponse.name);

  $('#taille').html('Height : '+this.data.reponse.height);
  $('#taille').css('height', (this.data.reponse.height*100)/145+'%');
  $('#poid').html('Weight : '+this.data.reponse.weight);
  $('#poid').css('height', (this.data.reponse.weight*100)/22044+'%');
  $('#vitesse').html('Speed : '+this.data.reponse.speed);
  $('#vitesse').css('height', (this.data.reponse.speed*100)/180+'%');
  $('#attack').html('Attack : '+this.data.reponse.attack);
  $('#attack').css('height', (this.data.reponse.attack*100)/180+'%');
  $('#spe_attack').html('Special Attack : '+this.data.reponse.sp_atk);
  $('#spe_attack').css('height', (this.data.reponse.sp_atk*100)/180+'%');
  $('#defense').html('Defense : '+this.data.reponse.defense);
  $('#defense').css('height', (this.data.reponse.defense*100)/230+'%');
  $('#hp').html('HP : '+this.data.reponse.hp);
  $('#hp').css('height', (this.data.reponse.hp*100)/255+'%');
  $('#spe_def').html('Special Defense : '+this.data.reponse.sp_def);
  $('#spe_def').css('height', (this.data.reponse.sp_def*100)/230+'%');

}

pokearticle.prototype.moveability = function(){

  var self          = this.data,
      localSelector = this,
      selfFun       = this.display,
      selfid        = self.reponse.national_id,
      ability       = $.getJSON('../../data/ability.json'),
      moves         = $.getJSON('../../data/moves.json'),
      type          = $.getJSON('../../data/types.json');

  console.log(selfid);

  $(this.detail).children('h2').html(self.name);

  $.when(ability, moves, type).done(function(ability, moves, type){

    selfFun(ability[0], moves[0], type[0], selfid, localSelector);

  });
}

pokearticle.prototype.display = function(ability, moves, type, pokemonId, localSelector){

  $('#abilities, #moves, #types').empty();

  $('#abilities').append('Abilities :');
  $('#moves').append('Moves :');
  $('#types').append('Type :');


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

        $('#abilities').append('<a href="#"><div class="ability" data-id="'+id+'" >'+ ability[i].name +'</div></a>')
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

          $('#types').append('<a href="#"><div class="type" data-id="'+id+'" >'+ type[y].name +'</div></a>')
        }

      }

    }

  }

  new Navigation();

}






