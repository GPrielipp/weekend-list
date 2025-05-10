<?php

header('Content-Type: application/json');

class DataBase extends SQLite3 {
    function __construct()
    {
        $this->open('../db/weekend-list.db', SQLITE3_OPEN_READWRITE);
    }
}

try {
    // connect to the database
    $db = new SQLite3('../db/weekend-list.db', SQLITE3_OPEN_READWRITE);
    // enable error handling
    $db->enableExceptions(true);

} catch (\Throwable $th) {
    echo json_encode(['error' => 'could not open database']);
    exit;
}


// parse the post request
$request = json_decode(file_get_contents('php://input'), true);

switch ($request['action'])
{
    case 'queryCompany':
        $cmd = 'SELECT * FROM users WHERE COMPANY = :company';
        queryDB($db, $cmd, $request);
        break;
    case 'queryPlatoon':
        $cmd = 'SELECT * FROM users WHERE COMPANY = :company AND PLATOON = :platoon';
        queryDB($db, $cmd, $request);
        break;
    case 'querySquad':
        $cmd = 'SELECT * FROM users WHERE COMPANY = :company AND PLATOON = :platoon AND SQUAD = :squad';
        queryDB($db, $cmd, $request);
        break;
    default:
        $cmd = 'SELECT * FROM users WHERE LAST_NAME = :last_name';
        queryDB($db, $cmd, $request);
        break;
}

// define all of the functions
function queryDB($db, $cmd, $request) {
    $query = $db->prepare($cmd);
    $query->bindParam(":company", $request['COMPANY'], SQLITE3_INTEGER);
    $query->bindParam(":platoon", $request['PLATOON'], SQLITE3_INTEGER);
    $query->bindParam(":squad", $request['SQUAD'], SQLITE3_INTEGER);
    $query->bindParam(":last_name", $request['LAST'], SQLITE3_TEXT);

    $data = $query->execute();
    $results = [];
    while ($row = $data->fetchArray(SQLITE3_ASSOC)) {
        $results[] = $row;
    }

    echo json_encode(['status' => 'success', 'results' => $results]);
}

?>