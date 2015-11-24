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

    $(this).empty();

  });

}

Type.prototype.show = function(){
  
  var self         = this.data;
  var selfBlock    = this.detail;

  $(this.detail).children('h2').html(self.name);
  $(this.detail).children('div img').attr('src', function(){
    return self.name + '.png';
  });


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

    $(selfBlock).children('.ineffective').append('<a href="#"><div class="type" data-id="'+id+'">'+ this.name +'</div></a>');

  });

  $(this.data.no_effect).each(function(){

    var link      = this.resource_uri,
        delimiter = '/',
        start     = 4,
        tokens    = link.split(delimiter).slice(start),
        step      = tokens.join(delimiter),
        lenght    = step.length,
        id        = step.slice(0,lenght -1);

    $(selfBlock).children('.no_effect').append('<a href="#"><div class="type" data-id="'+id+'">'+ this.name +'</div></a>'); 

  });

  $(this.data.resistance).each(function(){

    var link      = this.resource_uri,
        delimiter = '/',
        start     = 4,
        tokens    = link.split(delimiter).slice(start),
        step      = tokens.join(delimiter),
        lenght    = step.length,
        id        = step.slice(0,lenght -1);

    $(selfBlock).children('.resistance').append('<a href="#"><div class="type" data-id="'+id+'">'+ this.name +'</div></a>');    

  });

  $(this.data.super_effective).each(function(){

    var link      = this.resource_uri,
        delimiter = '/',
        start     = 4,
        tokens    = link.split(delimiter).slice(start),
        step      = tokens.join(delimiter),
        lenght    = step.length,
        id        = step.slice(0,lenght -1);

    $(selfBlock).children('.super_effective').append('<a href="#"><div class="type" data-id="'+id+'">'+ this.name +'</div></a>');    

  });

  $(this.data.weakness).each(function(){

    var link      = this.resource_uri,
        delimiter = '/',
        start     = 4,
        tokens    = link.split(delimiter).slice(start),
        step      = tokens.join(delimiter),
        lenght    = step.length,
        id        = step.slice(0,lenght -1);

    $(selfBlock).children('.weakness').append('<a href="#"><div class="type" data-id="'+id+'">'+ this.name +'</div></a>');

  });
  
  new Navigation();

}








