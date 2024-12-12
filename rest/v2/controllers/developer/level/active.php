<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/level/Level.php';

$conn = null;
$conn = checkDbConnection();
$level = new Level($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("levelid", $_GET)) {

        checkPayload($data);
        $level->level_aid = $_GET['levelid'];
        $level->level_is_active = trim($data["isActive"]);
        $level->level_datetime = date("Y-m-d H:i:s");

        checkId($level->level_aid);
        $query = checkActive($level);
        http_response_code(200);
        returnSuccess($level, "level", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();