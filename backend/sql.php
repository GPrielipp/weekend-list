<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = 'mysql'; // Use the SERVICE NAME from docker-compose, not 'localhost'
$db   = getenv('MYSQL_DATABASE');
$user = getenv('MYSQL_USER');
$pass = getenv('MYSQL_PASSWORD');

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

echo json_encode(["message" => "Connected to MySQL successfully!"]);
?>