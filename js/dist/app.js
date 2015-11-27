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

  var self       = this.callback,
      selfOption = this.optionnal;

  $.ajax({
    type: 'post',
    crossDomain:true,
    url: 'http://thomasvictoria.fr/pokemon/Class/index.php',
    data: {'datatype': this.datatype, 'id': this.id},
    dataType: 'json',
    success: function(json) {
      if (typeof selfOption === 'undefined') {
        self(json);
      } else {
        self(json, selfOption);
      }
    }
  });

}
$('#search').on('click', function(e){
	TweenMax.to($(this), 0.5,{width: '15%', delai:0.5, ease: Elastic.easeOut.config(1, 0.3)});
});
    var scene, camera, renderer, controls, dirLight, hemiLight;;

    var WIDTH  = 520;
    var HEIGHT = $(window).height() - 120;
    
    var SPEED = 0.01;
    
    var loader;    
    var img;
    var theJson;
    
    function init(pokemon) {
        $('#view3d').html('');
        scene = new THREE.Scene();
        theJson = 'http://thomasvictoria.fr/pokemon/assets/jsonModels/'+pokemon+'/'+pokemon+'.json';
        
        initMesh(theJson);
        initCamera();
        initLights();
        initRenderer();
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        document.getElementById('view3d').appendChild(renderer.domElement);
            
        render();
        
    }
    
    function initCamera() {
        camera = new THREE.PerspectiveCamera(90, WIDTH / HEIGHT, 1, 1000);
        camera.position.set(0, 5, 5);
        camera.lookAt(scene.position);
    }
    
    
    function initRenderer() {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(WIDTH, HEIGHT);
    }
    
    function initLights() {

        hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHSL( 1, 1, 1 );
        hemiLight.groundColor.setHSL( 1, 1, 1 );
        hemiLight.position.set( 0, 500, 0 );
        scene.add( hemiLight );

        //

        dirLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
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
    }
    
    var mesh = null;
    
    function initMesh(theJson) {
       loader = new THREE.JSONLoader();
       loader.load(theJson, function(geometry, materials) {
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
        renderer.setClearColor( 0xe0736b, 0.2 );
        controls.update();
    }

function showModel(pokemon){
    if($('#article').css('display') == 'block'){
        init(pokemon);
    }
}
function categorie(){

  this.nav       = $('#nav');
  this.pokemon   = $('.pokemon');
  this.type      = $('a div.type');
  this.move      = $('a div.move');
  this.ability   = $('a div.ability');
  this.articleP  = $('.popup#article');
  this.articleA  = $('.popup#ability');
  this.articleT  = $('.popup#type');
  this.articleM  = $('.popup#move');
  this.close     = $('.close');
  this.popup     = $('.popup');

  this.init();

}

categorie.prototype.init = function(){

  this.MenuBar();
  this.callAjax();

}

categorie.prototype.MenuBar = function(){


  $(this.nav).on('mouseenter', function(e){
    $(this).removeClass('minNav').addClass('fullNav');
  });

  $(this.nav).on('mouseleave', function(e){
    $(this).removeClass('fullNav').addClass('minNav');
  });

}

categorie.prototype.callAjax = function(){

  var selfPokemon = this.articleP;
  var selfMove    = this.articleM;
  var selfAbility = this.articleA;
  var selfType    = this.articleT;
  var selfPopup   = this.popup;

  $(this.pokemon).on('click', function(e){
    TweenMax.fromTo($('#loader-container'), 1,{display: 'block', opacity: 1}, {opacity: '0', display: 'none', delay:0.2});
    TweenMax.to($('#loader-container'), 0.2,{opacity: '0', display: 'none', delay:0.8});
    TweenMax.fromTo($(selfPokemon), 1,{'left': '-100%', display: 'block'}, {left: '0%', display: 'block', delay:1});
    var name = $(this).attr('data-name'),
        id   = $(this).attr('data-id');
    showModel(name);
    var Data = new call('pokemon', id, DisplayData);

  });

  $(this.ability).on('click', function(e){

    TweenMax.fromTo($(selfAbility), 1,{'left': '100%', display: 'none'}, {left: '0%', display: 'block'});

    var id = $(this).attr('data-id');
    new call('ability', id, DisplayAbility);

  });

  $(this.move).on('click', function(e){

    TweenMax.fromTo($(selfMove), 1,{'left': '100%', display: 'none'}, {left: '0%', display: 'block'});

    var id = $(this).attr('data-id');
    new call('move', id, DisplayMove);

  });

  $(this.type).on('click', function(e){

    TweenMax.fromTo($(selfType), 1,{'left': '100%', display: 'none'}, {left: '0%', display: 'block'});

    var id = $(this).attr('data-id');
    new call('type', id, DisplayType);

  });

  $(this.close).on('click', function(e){
    stopScroll = false;
    raf();
    TweenMax.fromTo($(this).parent().parent().parent(), 1,{'left': '0%', display: 'block'}, {left: '100%', display: 'none'});
    var context = $(this).parent().find('caracteristique');
    $(context).children('.image').empty();
    $(context).children('.tableEffect').children('.innteraction').each(function(){
      
      $(this).empty();
      
    });
    $(context).children('.pokemons').empty();
    $(context).children('h2').empty();
    
  });
  
  $(this.pokemon).on('click', function(e){
    stopScroll = false;
    raf();
    console.log($(this));
    new TweenMax.to($('#ability, #type, #move'), 1, {left: '100%', display: 'none'});
    var context = $('#ability, #type, #move');
    $(context).children('.image').empty();
    $(context).children('.tableEffect').children('.innteraction').each(function(){
      
      $(this).empty();
      
    });
    $(context).children('.pokemons').empty();
    $(context).children('h2').empty();
    
  });

}
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

  console.log(this.data.reponse.name);

  $('#article .container #caracteristique h2').html(this.data.reponse.name);

  var link         = this.data.reponse.descriptions[0].resource_uri,
      delimiter    = '/',
      start        = 4,
      tokens       = link.split(delimiter).slice(start),
      step         = tokens.join(delimiter),
      lenght       = step.length,
      id           = step.slice(0,lenght -1);

  new call('description', id, desc);

  var heightVar, topVar;

  stopScroll = true;

  $('.spec .vitesse span').append(this.data.reponse.speed);
  heightVar = (this.data.reponse.speed*100)/180 + '%';
  topVar = (100-((this.data.reponse.speed*100)/180)) + '%';
  TweenMax.fromTo($('.spec .vitesse'), 1,{'height': '0%', 'top': '100%'}, {height: heightVar, top: topVar, delay:0.6});

  $('.spec .attack span').append(this.data.reponse.attack);
  heightVar = (this.data.reponse.attack*100)/180 + '%';
  topVar = (100-((this.data.reponse.attack*100)/180)) + '%';
  TweenMax.fromTo($('.spec .attack'), 1,{'height': '0%', 'top': '100%'}, {height: heightVar, top: topVar, delay:0.8});

  $('.spec .spe_attack span').append(this.data.reponse.sp_atk);
  heightVar = (this.data.reponse.sp_atk*100)/180 + '%';
  topVar = (100-((this.data.reponse.sp_atk*100)/180)) + '%';
  TweenMax.fromTo($('.spec .spe_attack'), 1,{'height': '0%', 'top': '100%'}, {height: heightVar, top: topVar, delay:1});

  $('.spec .defense span').append(this.data.reponse.defense);
  heightVar = (this.data.reponse.defense*100)/180 + '%';
  topVar = (100-((this.data.reponse.defense*100)/180)) + '%';
  TweenMax.fromTo($('.spec .defense'), 1,{'height': '0%', 'top': '100%'}, {height: heightVar, top: topVar, delay:1.2});

  $('.spec .hp span').append(this.data.reponse.hp);
  heightVar = (this.data.reponse.hp*100)/180 + '%';
  topVar = (100-((this.data.reponse.hp*100)/180)) + '%';
  TweenMax.fromTo($('.spec .hp'), 1,{'height': '0%', 'top': '100%'}, {height: heightVar, top: topVar, delay:1.4});

  $('.spec .spe_def span').append(this.data.reponse.sp_def);
  heightVar = (this.data.reponse.sp_def*100)/180 + '%';
  topVar = (100-((this.data.reponse.sp_def*100)/180)) + '%';
  TweenMax.fromTo($('.spec .spe_def'), 1,{'height': '0%', 'top': '100%'}, {height: heightVar, top: topVar, delay:1.6});

}

pokearticle.prototype.moveability = function(){

  var self          = this.data,
      localSelector = this,
      selfFun       = this.display,
      selfid        = self.reponse.national_id,
      ability       = $.getJSON('http://thomasvictoria.fr/pokemon/data/ability.json'),
      moves         = $.getJSON('http://thomasvictoria.fr/pokemon/data/moves.json'),
      type          = $.getJSON('http://thomasvictoria.fr/pokemon/data/types.json');

  showModel(self.reponse.name);

  $('#weight').html('Weight : '+self.reponse.weight);
  $('#height').html('Height : '+self.reponse.height);
  $('#categories').html('Categories : '+self.reponse.species);

  $.when(ability, moves, type).done(function(ability, moves, type){

    selfFun(ability[0], moves[0], type[0], selfid, localSelector);

  });
}

pokearticle.prototype.display = function(ability, moves, type, pokemonId, localSelector){

  $('#abilities, #moves, #types').empty();

  $('#abilities').append('Abilities : ');

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

          $('#moves').append('<a href="#"><div class="move" data-id="'+id+'" ><div>Name : '+ moves[y].name.charAt(0).toUpperCase()+moves[y].name.slice(1) +' </div><div> Learn type : '+ moves[y].learn_type +'</div></div></a>')
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
          
          $('#types').append('<a href="#"><span class="type" data-id="'+id+'" ><img src="http://thomasvictoria.fr/pokemon/assets/pokemon_type/'+ type[y].name.charAt(0).toUpperCase()+type[y].name.slice(1) +'.png"></span></a>')
        }

      }

    }

  }

  new Navigation();

}







// Home
var gen;
var actualGen = 1;
$('#timeline > .time').on('mouseenter', function(){
	if($(this).attr('data-gen')){
		gen = $(this).attr('data-gen');
		$('#generation h3').html(gen);
	}
	
	
	if(gen != "all" && gen != actualGen){
		$('#home .bg').css('display', 'none');
		actualGen = gen;
		var bg = '.bg'+$(this).attr('data-gen');
		var img = bg+' img';
		TweenMax.to($(bg), 0,{display: 'block', opacity: 1});
		TweenMax.staggerFrom($(img), 0.5, {
			x:"-3000px",
			ease: Back.easeOut.config(1.7)
			}, 0.1);
	}
})


$('#timeline').on('mouseenter', '.time', function(){
	var thiss, before, afer;
	thiss = $(this);
	
	var size = $(this).children('div').css('height');
	size = size - 20;
	TweenMax.to(thiss.children('div'), 1, {height: size+'px'});
	
});


var TimeLine = function(){
	
	// Var
	this.sizeIT;
	this.elmt = $('.time');
	
	// Function
	this.init();
}

TimeLine.prototype.init = function(){
	this.sizeIT = ($(window).innerWidth() - 140) / 8;

	$('.interTime').css('width', this.sizeIT+'px');
	
	for(var x = 0; x <= this.sizeIT; x+=20){
		$('.interTime').append('<div class="time"><div class="smallTimeL"></div><div class="smallTimeR"></div></div>');
	}
}

new TimeLine();
function Home(){

  this.home       = $('#home');
  this.logo       = $('.logo');
  this.bg         = $('.bg');
  this.categorie  = $('#categorie');
  this.menu       = $('#nav ul');
  this.menuButton = $('#categorie ul .point');

  this.init();
}

Home.prototype.init = function(){

  this.toGen();
  this.CallPokemons();
  this.filters();
  
}

Home.prototype.filters = function(){

  var self         = this.menuButton,
      selfFunction = this.applyFilters;

  $(this.menuButton).on('click', function(){

    if($(this).hasClass('empty')){
      $(self).addClass('unselect');
      $(this).addClass('select');
      $(this).removeClass('unselect');
      $(self).removeClass('empty');
    }else if($(this).hasClass('unselect')){
      $(this).addClass('select');
      $(this).removeClass('unselect');
    }else if($(this).hasClass('select')){
      $(this).addClass('unselect');
      $(this).removeClass('select');
      if($(self).hasClass('select') === false && $(self).hasClass('empty') === false){
        $(self).addClass('empty');
        $(self).removeClass('select');
        $(self).removeClass('unselect');
        $('.pokemon').removeClass('hide filters');
        $('.pokemon').removeClass('view filters');
      } 
    }


    var filters = Array();

    $('#categorie ul .point.select').each(function(){

      filters.push($(this).attr('data-name'));      

    });

    $.getJSON( "http://thomasvictoria.fr/pokemon/data/types.json", function(data){

      selfFunction(filters, data);

    });


  });

}

Home.prototype.applyFilters = function(filters, data){

  var pokemonFiltered = Array();

  for(i=1; i < Object.keys(data).length+1; i++){

    if(filters.length == 0){

      $('.pokemon').each(function(){

        if($(this).hasClass('cache')){
          $(this).addClass('hide');
        }

      });

    }

    for(y=0; y < filters.length; y++){

      if(filters[y] == data[i].name){

        $('.pokemon').each(function(){

          for(z=0; z < Object.keys(data[i].pokemons).length; z++){

            if($(this).attr('data-id') == data[i].pokemons[z]){

              pokemonFiltered.push($(this).attr('data-id'));

            }

          }

        });

        var sortedPokemons = pokemonFiltered.sort(function(a, b) {
          return a - b;
        });
        var results = [];
        for (b = 0; b < sortedPokemons.length - 1; b++) {
          if (sortedPokemons[b + 1] == sortedPokemons[b]) {
            results.push(sortedPokemons[b]);
          }
        }

        if(filters.length > 1)
          usedArray = results;
        else
          usedArray = sortedPokemons;

        $('.pokemon').addClass('hide filters');
        $('.pokemon').removeClass('view filters');

        for(w=0; w < usedArray.length; w++){

          $('.pokemon[data-id='+usedArray[w]+']').removeClass('hide filters');
          $('.pokemon[data-id='+usedArray[w]+']').addClass('view filters');

        }

      }

    }  

  }
  
  //   Get the size of the content
  new resizeContent();
  //   Size of the content
  
}

Home.prototype.toGen = function(){

  var self = this.categorie;
  var home = this.home;
  
  $(this.bg).on('click', function(e){
    TweenMax.fromTo(home, 1, {left:0,display:'block', opacity:'1'},{left:'-100%', display:"none", opacity:'0'});
    TweenMax.fromTo(self, 1, {right:"100%", display:'none', opacity:'0'},{left:0, display:"block", opacity:'1'});
    $('#version').html($('#generation h3').html());
  });
  
  $(this.logo).on('click', function(){
    if($(home).css('display') == 'block'){
      TweenMax.fromTo(home, 1, {left:0,display:'block', opacity:'1'},{left:'-100%', display:"none", opacity:'0'});
      TweenMax.fromTo(self, 1, {right:"100%", display:'none', opacity:'0'},{left:0, display:"block", opacity:'1'});
      $('#version').html('All');
    }else{
      $('#content').empty();
      TweenMax.fromTo(self, 1, {left:0,display:'block', opacity:'1'},{right:'100%', display:"none", opacity:'0'});
      TweenMax.fromTo(home, 1, {left:"-100%", display:'none', opacity:'0'},{left:0, display:"block", opacity:'1'});
    }
  })

}

Home.prototype.CallPokemons = function(){
  
  var self = this.categorie;

  $(this.bg).on('click', function(){
    var generation = $('#generation h3').html();
    var pokedex = new call('pokedex', generation, Display);
  });
  
  $(this.logo).on('click', function(){
    if($(home).css('display') == 'block'){
      var pokedex = new call('pokedex', 'all', Display);
    }
  });

}

function Display(data){ 

  var content  = $('#content');
  content.html('');
  var child = Math.ceil((Object.keys(data.reponse)).length / 3);
  
  // Height pokemon elmt
  
   var size = Math.floor($(window).height() / 3);
  
  // Height pokemon elmt
  for(i = 0; i < Object.keys(data.reponse).length; i++){

    $(content).append('<div class="pokemon view" style="width:'+(size-2)+'px;height:'+(size-2)+'px;"data-id="'+ data.reponse[i].id +'" data-name="'+data.reponse[i].name+'"><div class="image"><img src="http://thomasvictoria.fr/pokemon/assets/images/' + data.reponse[i].name.charAt(0).toUpperCase()+data.reponse[i].name.slice(1) + '.png" /></div></div>');

  };

  //   Get the size of the content
  new resizeContent();
  //   Size of the content

  
  //  Gère le scroll
  VS = new vScroll();

  var showCategorie = new categorie();

  raf();
}

var VS;

function raf(){
  VS.update();
  if(!stopScroll){
    window.requestAnimationFrame(raf);
  }
};
var stopScroll = true;

new Home();
function Loader(){
	
	this.loader = $('#loader');
	Loader.imgLoaderLength = this.loader.children().length;
	Loader.i = 0;
	
	this.init();
	
}

Loader.prototype.init = function(){
	
	setInterval(this.activateLoader, 200);
	
}

Loader.prototype.activateLoader = function(){
	
	var imgLoader = $('#img-loader' + Loader.i);
	var imgLoaderNext = $('#img-loader' + (Loader.i+1))
	
	imgLoader.removeClass('img-active');
	imgLoaderNext.addClass('img-active');
	
	if(Loader.i == Loader.imgLoaderLength){
		Loader.i = -1;
	}
	
	Loader.i++;  
	
}

var loader = new Loader();
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
      json    = $.getJSON('http://thomasvictoria.fr/pokemon/data/moves.json');

  $(this.detail).children('h2').html(self.name);

  $.when(json).done(function(json){

    selfFun(json[selfid]);

  });

}

Move.prototype.pokemon = function(json){

  new call('pokedex', 'all', DisplayPokemon, json);

};








function Navigation(){

  this.type      = $('a .type');
  this.move      = $('a .move');
  this.ability   = $('a .ability');
  this.pokemon   = $('.pokemon');
  this.articleP  = $('.popup#article');
  this.articleA  = $('.popup#ability');
  this.articleT  = $('.popup#type');
  this.articleM  = $('.popup#move');
  
  this.init();

}


Navigation.prototype.init = function(){

  var selfPokemon = this.pokemon;
  var selfMove    = this.articleM;
  var selfAbility = this.articleA;
  var selfType    = this.articleT;

  $(this.ability).on('click', function(e){
        TweenMax.fromTo($(selfAbility), 1,{'left': '100%', display: 'none'}, {left: '0%', display: 'block'});


    var id = $(this).attr('data-id');
    new call('ability', id, DisplayAbility);

  });

  $(this.move).on('click', function(e){
        TweenMax.fromTo($(selfMove), 1,{'left': '100%', display: 'none'}, {left: '0%', display: 'block'});


    var id = $(this).attr('data-id');
    new call('move', id, DisplayMove);

  });

  $(this.type).on('click', function(e){
        TweenMax.fromTo($(selfType), 1,{'left': '100%', display: 'none'}, {left: '0%', display: 'block'});


    var id = $(this).attr('data-id');
    new call('type', id, DisplayType);

  });
  
  $(selfPokemon).on('click', function(e){
    stopScroll = false;
    raf();
    console.log($(this));
    new TweenMax.to($('#ability, #type, #move'), 1, {left: '100%', display: 'none'});
    var context = $('#ability, #type, #move');
    $(context).children('.image').empty();
    $(context).children('.tableEffect').children('.innteraction').each(function(){
      
      $(this).empty();
      
    });
    $(context).children('.pokemons').empty();
    $(context).children('h2').empty();
    
  });

}
function DisplayPokemon(pokemon, json){

  $('#ability').find('h2').html(json.name);
  
  for(i=1; i < Object.keys(json.pokemons).length; i++){

    for(x=1; x < Object.keys(pokemon.reponse).length; x++){

      if(pokemon.reponse[x].id == json.pokemons[i])
        $('.pokemons').append('<a href="#"><div class="pokemon" data-id="'+pokemon.reponse[x].id+'">'+pokemon.reponse[x].name+'</div></a>')

        }

  }

  new categorie();

}
var resizeContent = function(){
	
	this.size = Math.floor($(window).height() / 3);
	this.view = $('#content').find('.view');
	this.divView = $('#content').find('.view');
	this.content = $('#content');
	this.contentW;
	
	this.resize();
	this.razScroll();
}

resizeContent.prototype.resize = function(){
  stopScroll = !stopScroll;
  this.view = this.view.length / 3;
  this.contentW = (this.view * (this.size-2));
  this.content.css('width', this.contentW+'px');
}

resizeContent.prototype.razScroll = function(){

	TweenMax.staggerFrom(this.divView, 0.5,{opacity: 0, x:-300}, 0.1);
	
	if(stopScroll){
		TweenMax.from(this.content, 1, {
			transform:"translateX(0)",
			ease: Power1.easeIn, 
			onComplete:completeRazScroll
			});
		
	}
}

function completeRazScroll(){
	stopScroll = false;
	VS.raz();
	raf();
}
function SearchField(){

  this.field = $('#search');

  this.inputOnKeydown();

}

SearchField.prototype.inputOnKeydown = function(){

  var type         = $.getJSON('http://thomasvictoria.fr/pokemon/data/types.json'),
      abitily      = $.getJSON('http://thomasvictoria.fr/pokemon/data/ability.json'),
      move         = $.getJSON('http://thomasvictoria.fr/pokemon/data/moves.json');

  var self       = this.init;
  var selfSecond = this.DisplaySearch;
  var nav        = this.navigationSearch;


  $(this.field).keyup(function(e){

    var InputValue = $(this).val();

    $.when(type,abitily,move,InputValue,selfSecond).done(function(type, ability, move, value, selfSecond){

      self(type[0], ability[0], move[0], value, selfSecond);

    });

  });

}

SearchField.prototype.init = function(type, ability, move, value, callback){

  var index  = [type, ability, move],
      result = $('.searchField .results'),
      Vallenght = value.length;

  $(result).empty();

  for(i=0; i < 3;i++){

    if(i == 0)
      $(result).append('<div class="title">Types <div class="line"></div></div>');
    else if(i == 1)
      $(result).append('<div class="title">Ability<div class="line"></div></div>');
    else if(i == 2)
      $(result).append('<div class="title">Move<div class="line"></div></div>');

    for(y=1; y <= Object.keys(index[i]).length; y++){

      if(index[i][y] != undefined){

        var name      = index[i][y].name,
            link      = index[i][y].resource_uri,
            delimiter = '/',
            start     = 4,
            tokens    = link.split(delimiter).slice(start),
            step      = tokens.join(delimiter),
            lenght    = step.length,
            id        = step.slice(0,lenght -1),
            cutName   = name.substring(0, Vallenght);

        if(value.toUpperCase() === cutName.toUpperCase()){
          callback(name, id, i);
        }

        $('.pokemon').each(function(){

          if(Vallenght == 0){
            if($(this).hasClass('filters') && $(this).hasClass('cache')){
              $(this).removeClass('hide');
              $(this).addClass('view');
            }
            else if($(this).hasClass('hide') && $(this).hasClass('cache')){
              $(this).removeClass('hide');
              $(this).removeClass('cache');
            }
          }

          var Pokemon      = $(this).attr('data-name'),
              cutPokemon   = Pokemon.substring(0, Vallenght);

          if(value.toUpperCase() === cutPokemon.toUpperCase()){
            if($(this).hasClass('cache')&& $(this).hasClass('filters')){
              $(this).removeClass('cache');
              $(this).removeClass('hide');
              $(this).addClass('view');
            }
          }
          else{
            $(this).addClass('cache');
            $(this).addClass('hide');
            $(this).removeClass('view');
          }

        });

      }
    }

  }

  //   Get the size of the content
  new resizeContent();
  //   Size of the content

  if(Vallenght == 0){
    new TweenMax.to($('.searchField'), 0.5, {right:'-200px'});
    $(result).empty();

  }else{

    new TweenMax.to($('.searchField'), 0.5, {right:'0px'});

  }


  new Navigation();

}

SearchField.prototype.DisplaySearch = function(name, data, id){

  var result  = $('.searchField .results');

  if(id == 0)
    $(result).append('<a href="#"><div class="type" data-id="'+ data +'">'+ name +'</div></a>');
  else if(id == 1)
    $(result).append('<a href="#"><div class="ability" data-id="'+ data +'">'+ name +'</div></a>');
  else if(id == 2)
    $(result).append('<a href="#"><div class="move" data-id="'+ data +'">'+ name +'</div></a>');

}

new SearchField();

function DisplayType(data){

  new Type (data.reponse);

}

function Type(data){

  this.data   = data;
  this.detail = $('#type .container .caracteristique');

  this.init();

}

Type.prototype.init = function(){

  this.clear();
  this.show();

}

Type.prototype.clear = function(){

  $(this.detail).children().each(function(){

    if($(this).hasClass('image') == false && $(this).hasClass('tableEffect') == false)
      $(this).empty();
    else if($(this).hasClass('tableEffect')){
      
      $('.tableEffect').children().each(function(){
        
        $(this).empty();
        
      });
      
    }

  });

}

Type.prototype.show = function(){

  var self         = this.data;
  var selfBlock    = this.detail.children('.tableEffect'),
      selfFun      = this.pokemon,
      selfid       = self.id,
      json         = $.getJSON('http://thomasvictoria.fr/pokemon/data/types.json');
  
  $('.caracteristique .image').html('<img src="http://thomasvictoria.fr/pokemon/assets/pokemon_type/'+ self.name.charAt(0).toUpperCase()+self.name.slice(1) +'.png" alt="">');

  $(selfBlock).children('.ineffective').append('Ineffective');
  $(selfBlock).children('.no_effect').append('No effect');
  $(selfBlock).children('.super_effective').append('Super Effective');
  $(selfBlock).children('.weakness').append('Weakness');
  $(selfBlock).children('.resistance').append('Resistance');


  $(this.data.ineffective).each(function(){

    var link      = this.resource_uri,
        delimiter = '/',
        start     = 4,
        tokens    = link.split(delimiter).slice(start),
        step      = tokens.join(delimiter),
        lenght    = step.length,
        id        = step.slice(0,lenght -1);

    $(selfBlock).children('.ineffective').append('<a href="#"><div class="type img" data-id="'+id+'"><img src="http://thomasvictoria.fr/pokemon/assets/pokemon_type/'+ this.name.charAt(0).toUpperCase()+this.name.slice(1) +'.png" ></div></a>');

  });

  $(this.data.no_effect).each(function(){

    var link      = this.resource_uri,
        delimiter = '/',
        start     = 4,
        tokens    = link.split(delimiter).slice(start),
        step      = tokens.join(delimiter),
        lenght    = step.length,
        id        = step.slice(0,lenght -1);

    $(selfBlock).children('.no_effect').append('<a href="#"><div class="type img" data-id="'+id+'"><img src="http://thomasvictoria.fr/pokemon/assets/pokemon_type/'+ this.name.charAt(0).toUpperCase()+this.name.slice(1) +'.png" ></div></a>'); 

  });

  $(this.data.resistance).each(function(){

    var link      = this.resource_uri,
        delimiter = '/',
        start     = 4,
        tokens    = link.split(delimiter).slice(start),
        step      = tokens.join(delimiter),
        lenght    = step.length,
        id        = step.slice(0,lenght -1);

    $(selfBlock).children('.resistance').append('<a href="#"><div class="type img" data-id="'+id+'"><img src="http://thomasvictoria.fr/pokemon/assets/pokemon_type/'+ this.name.charAt(0).toUpperCase()+this.name.slice(1) +'.png" ></div></a>');    

  });

  $(this.data.super_effective).each(function(){

    var link      = this.resource_uri,
        delimiter = '/',
        start     = 4,
        tokens    = link.split(delimiter).slice(start),
        step      = tokens.join(delimiter),
        lenght    = step.length,
        id        = step.slice(0,lenght -1);

    $(selfBlock).children('.super_effective').append('<a href="#"><div class="type img" data-id="'+id+'"><img src="http://thomasvictoria.fr/pokemon/assets/pokemon_type/'+ this.name.charAt(0).toUpperCase()+this.name.slice(1) +'.png" ></div></a>');    

  });

  $(this.data.weakness).each(function(){

    var link      = this.resource_uri,
        delimiter = '/',
        start     = 4,
        tokens    = link.split(delimiter).slice(start),
        step      = tokens.join(delimiter),
        lenght    = step.length,
        id        = step.slice(0,lenght -1);

    $(selfBlock).children('.weakness').append('<a href="#"><div class="type img" data-id="'+id+'"><img src="http://thomasvictoria.fr/pokemon/assets/pokemon_type/'+ this.name.charAt(0).toUpperCase()+this.name.slice(1) +'.png" ></div></a>');

  });

  new Navigation();

  $.when(json).done(function(json){

    selfFun(json[selfid]);

  });

}

Type.prototype.pokemon = function(json){

  new call('pokedex', 'all', DisplayPokemon, json);

};




var vScroll = function(){

	this.currentY = 0;
	this.targetY = 0;

	this.ease = 0.1;

	this.maxScroll = 0;

	this.scrollWrapper = $('#content');
	this.lastChild = $('#content .pokemon:last-child');
	
	this.resize();

	this.bind();

};

vScroll.prototype.bind = function() {
	
	var self = this;

	VirtualScroll.on(function(e) {
		self.onVirtualScroll(e);
	});

	$(window).on('resize', $.proxy(this.resize, this));

};

vScroll.prototype.onVirtualScroll = function(e) {

	this.targetY += e.deltaY;
	this.targetY = Math.max( this.maxScroll, this.targetY);
	this.targetY = Math.min(0, this.targetY);

};

vScroll.prototype.resize = function() {
	
	this.maxScroll = (  this.lastChild.offset().left) * -1;
	
};

vScroll.prototype.update = function() {

	this.currentY += (this.targetY - this.currentY) * this.ease;
	this.scrollWrapper.css({
		transform: 'translateX(' + this.currentY + 'px)'
	});

};

vScroll.prototype.raz = function(){
	this.currentY = 0;
	this.targetY = 0;
	
	this.resize();
	this.bind();
}
