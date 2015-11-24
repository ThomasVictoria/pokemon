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

  this.article.find('h2').html(this.data.reponse.name);

  this.td[0].innerText = 'Height : ';
  this.td[1].innerText = this.data.reponse.height;

  this.td[2].innerText = 'Attack : ';
  this.td[3].innerText = this.data.reponse.attack;

  this.td[4].innerText = 'Weight : ';
  this.td[5].innerText = this.data.reponse.weight;

  this.td[6].innerText = 'Defense : ';
  this.td[7].innerText = this.data.reponse.defense;

  this.td[8].innerText = 'Speed : ';
  this.td[9].innerText = this.data.reponse.speed;

}

pokearticle.prototype.moveability = function(){

  var self    = this.data,
      selfFun = this.display,
      selfid  = self.reponse.national_id,
      ability = $.getJSON('../../data/ability.json'),
      moves   = $.getJSON('../../data/moves.json');

  console.log(selfid);

  $(this.detail).children('h2').html(self.name);

  $.when(ability, moves).done(function(ability, moves){

    selfFun(ability[0], moves[0], selfid);

  });
}

pokearticle.prototype.display = function(ability, moves, pokemonId){

  $('#abilities, #moves').empty();

  $('#abilities').append('Abilities :');
  $('#moves').append('Moves :')


  for(i=1; i < Object.keys(ability).length; i++){

    for(x=1; x < Object.keys(ability[i].pokemons).length; x++){

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

  new Navigation();

}






