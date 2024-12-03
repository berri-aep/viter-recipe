<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/Recipe.php';

$conn = null;
$conn = checkDbConnection();
$recipe = new Recipe($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("recipeid", $_GET)) {

        checkPayload($data);
        $recipe->recipe_aid = $_GET['recipeid'];
        $recipe->recipe_is_active = trim($data["isActive"]);
        $recipe->recipe_datetime = date("Y-m-d H:i:s");

        checkId($recipe->recipe_aid);
        $query = checkActive($recipe);
        http_response_code(200);
        returnSuccess($recipe, "recipe", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();