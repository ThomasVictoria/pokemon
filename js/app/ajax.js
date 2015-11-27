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
    url: 'http://pokemon.dev/Class/index.php',
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