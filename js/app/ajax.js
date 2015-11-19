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
		url: 'http://127.0.0.1/pokemon/index.php',
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