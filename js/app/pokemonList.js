function DisplayPokemon(pokemon, json){

  $('.popup').find('h2').html(json.name);
  
  for(i=1; i < Object.keys(json.pokemons).length; i++){

    for(x=1; x < Object.keys(pokemon.reponse).length; x++){

      if(pokemon.reponse[x].id == json.pokemons[i])
          
            $('.pokemons').append('<a href="#"><div class="pokemon" data-id="'+pokemon.reponse[x].id+'">'+pokemon.reponse[x].name+'</div></a>');

        }

  }

  new categorie();

  $('#move, #ability, #type').on('click', function(){

    $(this).fadeOut(500);

  });

}