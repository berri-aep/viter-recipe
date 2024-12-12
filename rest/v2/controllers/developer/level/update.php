<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$level = new Level($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("levelid", $_GET)) {
  // check data
  checkPayload($data);
  // get data
  $level->level_aid = $_GET['levelid'];
  $level->level_title = checkIndex($data, "level_title");
  $level->level_created = date("Y-m-d H:i:s");
  $level->level_datetime = date("Y-m-d H:i:s");
  checkId($level->level_aid);

//checks current data to avoid same entries from being updated
// $level_name_old = checkIndex($data, 'level_name_old');
// compareName($level, $level_name_old, $level->level_name);
// checkId($level->level_aid);

  // update
  $query = checkUpdate($level);
  returnSuccess($level, "level", $query);
}

// return 404 error if endpoint not available
checkEndpoint();