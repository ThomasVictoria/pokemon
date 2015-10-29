<?php

class Call
{

	public function pokedex()
	{

		$response = $this->getCall('http://pokeapi.co/api/v1/pokedex/1/'); 
		return $response->pokemon;
	}

	public function getPokemon($id)
	{

		$response = $this->getCall('http://pokeapi.co/api/v1/pokemon/'.$id.'/');

		return $response;

	}
	
	function getImage($id)
	{
		
		$response = $this->getCall('http://pokeapi.co'.$id);
		return $response->image;
		
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