<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// require 'functions.php';
// use needed classes
require '../../../models/developer/level/Level.php';


// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$level = new Level($conn);
$response = new Response();
// validate api key
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        // get data
        // get task id from query string
        $level->level_start = $_GET['start'];
        $level->level_total = 5;
        //check to see if task id in query string is not empty and is number, if not return json error
        checkLimitId($level->level_start, $level->level_total);

        $query = checkReadLimit($level);
        $total_result = checkReadAll($level);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $level->level_total,
            $level->level_start
        );
    }
    // return 404 error if endpoint not available
    checkEndpoint();
}

http_response_code(200);
// when authentication is cancelled
// header('HTTP/1.0 401 Unauthorized');
checkAccess();