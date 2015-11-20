function call(datatype, id, callback, optionnal){

  this.datatype = datatype;
  this.id = id;
  this.callback = callback;
  this.optionnal = optionnal;

  this.init();
  
}

call.prototype.init = function(){
  
  this.request();
  
}

call.prototype.request = function(){

var self = this.callback;
  
  $.ajax({
		type: 'post',
		crossDomain:true,
		url: 'http://pokemon.dev/Class/index.php',
		data: {'datatype': this.datatype, 'id': this.id},
		dataType: 'json',
		success: function(json) {
			if (typeof this.optionnal === 'undefined') {
				self(json);
			} else {
				self(json, this.optionnal);
      }
		}
	});
  
}
//Exemple utilisation fonction ajax : 

var pokedex = new call('type', '2', yolo);

function yolo(data) {
  
  console.log(data);
  
}

//// Fonction de requette sur l'api configurer avec callback
//function request(datatype, id, callback, optionnal)
//{
//	$.ajax({
//		type: 'post',
//		crossDomain:true,
//		url: 'http://127.0.0.1/pokemon/index.php',
//		data: {'datatype': datatype, 'id': id},
//		dataType: 'json',
//		success: function(json) {
//			if (typeof optionnal === 'undefined') {
//				callback(json);
//			} else {
//				console.log(json);
//				callback(json, optionnal);
//			}
//			
//		}
//	});
//
//}
//
//request('pokedex', 'null', display);
//
//// Fonction d'affichage du slider
//function display(data) {
//
//	for(var key in data.reponse) {
//
//		var link  = data.reponse[key].resource_uri,
//				delimiter = '/' ,
//				start = 3,
//				tokens = link.split(delimiter).slice(start),
//				step = tokens.join(delimiter),
//				lenght = step.length,
//				result = step.slice(0,lenght -1);
//		data.reponse[key]['id'] = result;
//
//	}
//
//	data.reponse.sort(function(a, b) {
//		return a['id'] - b['id'];
//	});
//
//	printPokemon(data);
//
//	$('.button').on('click', function() {
//		var direction = $(this).attr('class');
//		movePokemon(direction);
//		printPokemon(data);
//	});
//
//	$('.compare .desc').on('click', function() {
//		var compare = $('.active').attr('data-id'),
//				name = $('.active').text(),
//				image = $('.image img').attr('src');
//		$('.compare .info .name').text(name);
//		$('.compare .info img').attr('src', image);
//		$('.compare').attr('data-id', compare);
//		$('.compare .second').css('display', 'inherit');
//	});
//
//	$('.second').on('click', function() {
//		var first  = $('.compare').attr('data-id'),
//				second = $('.active').attr('data-id');
//		request('pokemon', first, displayStats, '.comparefield .first');
//		request('pokemon', second, displayStats, '.comparefield .second');
//	});
//
//}
//
////	Attribue des positions dans le slider et fait une requette en fonction de l'id
//function printPokemon(data) {
//	$('.cell').each(function() {
//		var pokemonId = $(this).attr('data-id');
//		$(this).text( pokemonId+' '+data.reponse[pokemonId-1].name);
//	});
//
//	// -1 afin de selectioner le premier élément
//	var current = $('.left').attr('data-id');
//	request('pokemon', current, displayStats, '.stats');
//
//}
//
//// Fonction pour faire defiler les pokemons
//function movePokemon(className) {
//
//	$('.cell').each(function() {
//		var actualPokemon = $(this).attr('data-id');
//		if(className == 'goright button') {
//			actualPokemon++;
//			$(this).attr('data-id', actualPokemon);
//		} else if (className == 'goleft button' && actualPokemon == 1) {
//			return false;
//		} else if (className == 'goleft button') {
//			actualPokemon--;
//			$(this).attr('data-id', actualPokemon);
//		}
//	});
//}
//
//// Fonction qui affiche les stats en fonction du pokemon du centre
//function displayStats(data, place) {
//
//	request('image', data.reponse.sprites[0].resource_uri, displayImages, place);
//	$('img').load(function(){
//		$(place+' .hp').text(data.reponse.hp + ' HP');
//		$(place+' .attack').text(data.reponse.attack + ' Attack');
//	});
//}
//
////	Fonction qui va chercher le sprite sur l'api
//function displayImages(data, place) {
//	$(place+' .image img').attr('src', 'http://pokeapi.co'+data.reponse);
//}
//
//
//
//