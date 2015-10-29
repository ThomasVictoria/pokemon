<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
require 'class.php';

$api = new Call();

if(!empty($_POST['datatype'])) {

	if($_POST['datatype'] == 'pokedex')
	{
		$reponse = $api->pokedex();
	}
	elseif($_POST['datatype'] == 'pokemon' && !empty($_POST['id']))
	{
		$reponse = $api->getPokemon($_POST['id']);
	}
	elseif($_POST['datatype'] == 'image' && !empty($_POST['id']))
	{
		$reponse = $api->getImage($_POST['id']);
	}
}
echo json_encode(['reponse' => $reponse]);
