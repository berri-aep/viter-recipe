<?php
$conn = null;
$conn = checkDbConnection();
$level = new Level($conn);
// $error = [];
// $returnData = [];
if (array_key_exists("levelid", $_GET)) {
    $level->level_aid = $_GET['levelid'];
    checkId($level->level_aid);
    $query = checkReadById($level);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($level);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();