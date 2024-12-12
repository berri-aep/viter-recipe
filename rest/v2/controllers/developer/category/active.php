<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developer/category/Category.php';

$conn = null;
$conn = checkDbConnection();
$category = new Category($conn);
$response = new Response();

$body = file_get_contents("php://input");
$data = json_decode($body, true);

$error = [];
$returnData = [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("categoryid", $_GET)) {

        checkPayload($data);
        $category->category_aid = $_GET['categoryid'];
        $category->category_is_active = trim($data["isActive"]);
        $category->category_datetime = date("Y-m-d H:i:s");

        checkId($category->category_aid);
        $query = checkActive($category);
        http_response_code(200);
        returnSuccess($category, "category", $query);
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();