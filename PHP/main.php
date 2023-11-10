<?php

$host = 'localhost';
$dbname = 'warriorarena';
$username = 'root';
$password = 'root';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->exec("SET NAMES utf8");

  // echo "Connexion to $dbname on $host successful";

} catch (PDOException $e) {
  die('Connexion failed: ' . $e->getMessage());
}

// Récupération des données de la table players
$requestPlayers = $pdo->query('SELECT * FROM players');
$players = $requestPlayers->fetchAll(PDO::FETCH_ASSOC);

// Récupération des données de la table rangeattacks
$requestRangeAttacks = $pdo->query('SELECT * FROM rangeattacks');
$rangeAttacks = $requestRangeAttacks->fetchAll(PDO::FETCH_ASSOC);

// Récupération des données de la table scrumattacks
$requestScrumAttacks = $pdo->query('SELECT * FROM scrumattacks');
$scrumAttacks = $requestScrumAttacks->fetchAll(PDO::FETCH_ASSOC);

// Fusion des données dans un tableau associatif
$data = array(
    "players" => $players,
    "rangeattacks" => $rangeAttacks,
    "scrumattacks" => $scrumAttacks
);

// Retourne les données en tant que réponse JSON
header('Content-Type: application/json');
echo json_encode($data);
?>