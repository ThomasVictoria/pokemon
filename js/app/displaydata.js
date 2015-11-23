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