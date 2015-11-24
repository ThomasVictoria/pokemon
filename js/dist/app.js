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
    
    function init(pokemon) {
        scene = new THREE.Scene();
        
        initMesh(pokemon);
        initCamera();
        initLights();
        initRenderer();
    
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        $('#view3d').html('');
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
    function initMesh(pokemon) {
        
        var loader = new THREE.JSONLoader();
        loader.load('http://pokemon.dev/assets/jsonModels/'+pokemon+'/'+pokemon+'.json', function(geometry, materials) {
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

function showModel(pokemon){
    if($('#article').css('display') == 'block'){
        init(pokemon);
        render();
    }
}
function categorie(){

  this.nav      = $('#nav');
  this.pokemon  = $('.pokemon');
  this.article  = $('#article');
 
  this.init();

}

categorie.prototype.init = function(){

  var self = this.article;
  
  $(this.nav).on('mouseenter', function(e){
    $(this).removeClass('minNav').addClass('fullNav');
  });

  $(this.nav).on('mouseleave', function(e){
    $(this).removeClass('fullNav').addClass('minNav');
  });

  $(this.pokemon).on('click', function(e){
    $(self).fadeIn();
    var name = $(this).html(),
        id   = $(this).attr('data-id');
    showModel(name);
    var pokemonData = new call('pokemon', id, DisplayData);
  });

  $(this.article).on('click', '#close', function(e){
    $(self).fadeOut(400);
  });
  
}
function DisplayData(data){
  console.log(data);
  var popo = new pokearticle(data);
  
}

var pokearticle = function(data){
  
  this.article = $('#article');
  this.td = $('#article').find('td');

  this.show(data);
  
}

pokearticle.prototype.show = function(data){
  
  this.article.find('h2').html(data.reponse.name);
  
  this.td[0].innerText = 'Height : ';
  this.td[1].innerText = data.reponse.height;
  
  this.td[2].innerText = 'Attack : ';
  this.td[3].innerText = data.reponse.attack;
  
  this.td[4].innerText = 'Weight : ';
  this.td[5].innerText = data.reponse.weight;
  
  this.td[6].innerText = 'Defense : ';
  this.td[7].innerText = data.reponse.defense;
  
  this.td[8].innerText = 'Speed : ';
  this.td[9].innerText = data.reponse.speed;
  
}
// Home
$('#timeline > .time').on('mouseenter', function(){
	if($(this).attr('data-gen')){
		$('#generation h3').html($(this).attr('data-gen'));
	}
})

var TimeLine = function(){
	
	// Var
	this.sizeIT; 
	
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
        $('.pokemon').removeClass('hide');
        $('.pokemon').removeClass('view');
      } 
    }

    var filters = Array();

    $('#categorie ul .point.select').parent().each(function(){

      filters.push($(this).find('.text').html());

    });

    $.getJSON( "../../data/types.json", function(data){

      selfFunction(filters, data);

    });


  });

}

Home.prototype.applyFilters = function(filters, data){

  var pokemonFiltered = Array();

  for(i=1; i < Object.keys(data).length; i++){

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
        
        $('.pokemon').addClass('hide');
        $('.pokemon').removeClass('view');

        for(w=0; w < usedArray.length; w++){

          $('.pokemon[data-id='+usedArray[w]+']').removeClass('hide');
          $('.pokemon[data-id='+usedArray[w]+']').addClass('view');

        }

      }

    }  

  }

}

Home.prototype.toGen = function(){

  var self = this.categorie;

  $(this.home).on('click', function(e){
    $(this).fadeOut();
    $(self).fadeIn();
    $('#version').html($('#generation h3').html());
  });

}

Home.prototype.CallPokemons = function(){

  $(this.home).on('click', function(){

    var generation = $('#generation h3').html();

    var pokedex = new call('pokedex', generation, Display);

  });

}

function Display(data){

  var content  = $('#content');
  var child = Math.ceil((Object.keys(data.reponse).length / 3));
  
  // Height pokemon elmt
  
   var size = Math.round($(window).height() / 3);
  
  // Height pokemon elmt
  
  var contentW = (child * 272);
  
  $('#content').css('width', contentW+'px');
  for(i = 0; i < Object.keys(data.reponse).length; i++){

    $(content).append('<div class="pokemon view" style="width:'+size+'px;height:'+size+'px;"data-id="'+ data.reponse[i].id +'">'+ data.reponse[i].name +'</div>');

  };

  var VS = new vScroll(child);

  var showCategorie = new categorie();

  (function raf(){
    VS.update();
    window.requestAnimationFrame(raf);
  })();

}

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
function SearchField(){

  this.field = $('form #search');

  this.inputOnKeydown();

}

SearchField.prototype.inputOnKeydown = function(){

  var type         = $.getJSON('../../data/types.json'),
      abitily      = $.getJSON('../../data/ability.json'),
      move         = $.getJSON('../../data/moves.json');

  var self       = this.init;
  var selfSecond = this.DisplaySearch;

  $(this.field).keyup(function(e){

    var InputValue = $(this).val();

    $.when(type,abitily,move,InputValue,selfSecond).done(function(type, ability, move, value, selfSecond){

      self(type[0], ability[0], move[0], value, selfSecond);

    });

  });

}

SearchField.prototype.init = function(type, ability, move, value, callback){

  var index  = [type, ability, move],
      result = $('.searchField .results');

  $(result).html('');

  for(i=0; i < 3;i++){

    if(i == 0)
      $(result).append('<div class="title">Types</div>');
    else if(i == 1)
      $(result).append('<div class="title">Ability</div>');
    else if(i == 2)
      $(result).append('<div class="title">Move</div>');

    for(y=1; y <= Object.keys(index[i]).length; y++){

      if(index[i][y] != undefined){

        var Vallenght = value.length,
            name      = index[i][y].name,
            cutName   = name.substring(0, Vallenght);

        if(Vallenght == 0){
          if($('.pokemon').hasClass('cache')){
            $('.pokemon').removeClass('cache');
            $('.pokemon').removeClass('hide');
            $('.pokemon').addClass('view');
          }
          return false;
        }
        else if(value.toUpperCase() === cutName.toUpperCase()){
          callback(index[i][y].name, i);
        }

        $('.pokemon').each(function(){

          var Pokemon    = $(this).html(),
              cutPokemon = Pokemon.substring(0, Vallenght);

          if(value.toUpperCase() === cutPokemon.toUpperCase()){
            if($(this).hasClass('cache')){
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

}

SearchField.prototype.DisplaySearch = function(name, id){

  var result  = $('.searchField .results');

  $(result).append('<div>'+ name +'</div>');

}

new SearchField();

var vScroll = function(child){

	this.currentY = 0;
	this.targetY = 0;

	this.ease = 0.1;

	this.maxScroll = 0;

	this.scrollWrapper = $('#content');

	this.resize(child);

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

vScroll.prototype.resize = function(child) {
	this.maxScroll = ($('#content .pokemon:nth-child('+child+')').offset().left - $(window).width()) * -1;
};

vScroll.prototype.update = function() {

	this.currentY += (this.targetY - this.currentY) * this.ease;
	this.scrollWrapper.css({
		transform: 'translateX(' + this.currentY + 'px)'
	});

}; 