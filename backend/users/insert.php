<?php

if($_SERVER['REQUEST_METHOD'] != 'POST') {
  die(json_encode(['error' => 'Expected a POST request']));
}

// get the information from the php://input

$json_data = file_get_contents('php://input');
$data = json_decode($json_data);
$columns = ['alpha', 'first_name', 'last_name', 'platoon', 'squad', 'permissions'];

// validate the data
$issues = [];
foreach($columns as $key) {
  if(!array_key_exists($key, $data)) {
    $issues[] = "Missing '$key'";
  }
}

if(count($issues) > 0) {
  die(json_encode(['error' => $issues]));
}

// set the return headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// open the db connection
$host = 'mysql'; // Use the SERVICE NAME from docker-compose, not 'localhost'
$db   = getenv('MYSQL_DATABASE');
$user = getenv('MYSQL_USER');
$pass = getenv('MYSQL_PASSWORD');

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// insert into the database
$cmd = "INSERT INTO $db ($columns) VALUES (";
foreach($columns as $key) {
  $cmd = $cmd . "'{$data[$key]}',";
}
$cmd = substr($cmd, 0, -1) . ');';

$result = $conn->query($cmd);

// close the connection
$conn->close();

// return the results
if($result === TRUE) {
  echo(json_encode(["success" => $data]));
} else {
  echo(json_encode(["error" => "Failed to insert"]));
}

?>