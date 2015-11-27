<?php

class Call
{

  public function pokedex($gen)
  {

    $response = $this->getCall('http://pokeapi.co/api/v1/pokedex/1/');

    foreach($response->pokemon as $pokemon){

      $link        = $pokemon->resource_uri;
      $delimiter   = '/';
      $splited     = explode($delimiter, $link);
      $pokemon->id = $splited[3];

    }

    function cmp($a, $b)
    {
      if ($a->id == $b->id) {
        return 0;
      }
      return ($a->id < $b->id) ? -1 : 1;
    }

    usort($response->pokemon, "cmp");

    if($gen == 1){
      $start = 0;
      $end   = 151;
    }
    elseif($gen == 2){
      $start = 151;
      $end   = 251;
    }
    elseif($gen == 3){
      $start = 251;
      $end   = 386;
    }
    elseif($gen == 4){
      $start = 386;
      $end   = 494;
    }
    elseif($gen == 5){
      $start = 494;
      $end   = 649;
    }
    elseif($gen == 6){
      $start = 649;
      $end   = 718;
    }
    elseif($gen == 'all'){
      return $response->pokemon;
    }
    
    for($i=$start; $i < $end; $i++){
      $data[] = $response->pokemon[$i];
    }
    
    return $data;
  }

  public function getPokemon($id)
  {

    $response = $this->getCall('http://pokeapi.co/api/v1/pokemon/'.$id.'/');
    return $response;

  }

  function getDesc($id)
  {

    $response = $this->getCall('http://pokeapi.co/api/v1/description/'.$id.'/');
    return $response;

  }

  function getAbility($id)
  {

    $response = $this->getCall('http://pokeapi.co/api/v1/ability/'.$id.'/');
    return $response;

  }

  function getMove($id)
  {

    $response = $this->getCall('http://pokeapi.co/api/v1/move/'.$id.'/');
    return $response;

  }

  function getType($id)
  {

    $response = $this->getCall('http://pokeapi.co/api/v1/type/'.$id.'/');
    return $response;

  }

  function getCall($url) {

    $service_url = $url;
    $curl = curl_init($service_url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $curl_response = curl_exec($curl);
    curl_close($curl);
    $response = json_decode($curl_response); 

    return $response;

  }

}