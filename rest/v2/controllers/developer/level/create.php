<?php
$conn = null;
$conn = checkDbConnection();
$level = new Level($conn);

if (array_key_exists("levelid", $_GET)) {
    checkEndpoint();
} 

checkPayload($data);

$level->level_title = checkIndex($data, "level_title");

$level->level_is_active = 1;
$level->level_created = date("Y-m-d H:i:s");
$level->level_datetime = date("Y-m-d H:i:s");

// isNameExist($level, $level->level_title);

$query = checkCreate($level);
returnSuccess($level, "level", $query);