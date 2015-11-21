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
    var scene, camera, renderer, controls, dirLight, hemiLight;;

    var WIDTH  = 520;
    var HEIGHT = $(window).height() - 120;
    
    var SPEED = 0.01;
    
    function init() {
        scene = new THREE.Scene();
        
        initMesh();
        initCamera();
        initLights();
        initRenderer();
    
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        document.getElementById('view3d').appendChild(renderer.domElement);
    }
    
    function initCamera() {
        camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
        camera.position.set(0, 3.5, 5);
        camera.lookAt(scene.position);
    }
    
    
    function initRenderer() {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(WIDTH, HEIGHT);
    }
    
    function initLights() {

        hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set( 0, 500, 0 );
        scene.add( hemiLight );

        //

        dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -1, 1.75, 1 );
        dirLight.position.multiplyScalar( 50 );
        scene.add( dirLight );

        dirLight.castShadow = true;

        dirLight.shadowMapWidth = 2048;
        dirLight.shadowMapHeight = 2048;

        var d = 50;

        dirLight.shadowCameraLeft = -d;
        dirLight.shadowCameraRight = d;
        dirLight.shadowCameraTop = d;
        dirLight.shadowCameraBottom = -d;

        dirLight.shadowCameraFar = 3500;
        dirLight.shadowBias = -0.0001;
        //dirLight.shadowCameraVisible = true;
    }
    
    var mesh = null;
    function initMesh() {
        
        var loader = new THREE.JSONLoader();
        loader.load('http://pokemon.dev/assets/jsonModels/Charmander/Charmander.json', function(geometry, materials) {
            mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
            mesh.translation = THREE.GeometryUtils.center(geometry);
            scene.add(mesh);
        });
        
    }
    
    function rotateMesh() {
        if (!mesh) {
            return;
        }
    
        mesh.rotation.x -= SPEED * 2;
        mesh.rotation.y -= SPEED;
        mesh.rotation.z -= SPEED * 3;
    }
    
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        renderer.setClearColor( 0x2ecc71 );
        controls.update();
    }

function showModel(){
    if($('#article').css('display') == 'block'){
        init();
        render();
    }
}
$('#nav').on('mouseenter', function(e){
	$('#nav').removeClass('minNav').addClass('fullNav');
});

$('#nav').on('mouseleave', function(e){
	$('#nav').removeClass('fullNav').addClass('minNav');
});

$('.pokemon').on('click', function(e){
	$('#article').fadeIn(400);
	showModel();
});

$('#article').on('click', '#close', function(e){
	$('#article').fadeOut(400);
});
// Home

//Exemple utilisation fonction ajax : 

var pokedex = new call('pokedex', '5', yolo);

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
// Timeline
function timeline() {
//    console.log("ok");
    requestAnimationFrame(timeline);
}
timeline();