<?php
$conn = null;
$conn = checkDbConnection();
$level = new Level($conn);
// $error = [];
// $returnData = [];
if (array_key_exists("levelid", $_GET)) {
    $level->level_aid = $_GET['levelid'];
    checkId($level->level_aid);
    // isAssociated($level);
    $query = checkDelete($level);
    returnSuccess($level, "level", $query);
}

checkEndpoint();