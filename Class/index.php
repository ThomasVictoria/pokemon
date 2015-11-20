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
  elseif($_POST['datatype'] == 'ability' && !empty($_POST['id']))
  {
    $reponse = $api->getAbility($_POST['id']);
  }
  elseif($_POST['datatype'] == 'move' && !empty($_POST['id']))
  {
    $reponse = $api->getMove($_POST['id']);
  }
  elseif($_POST['datatype'] == 'type' && !empty($_POST['id']))
  {
    $reponse = $api->getType($_POST['id']);
  }
}

echo json_encode(['reponse' => $reponse]);