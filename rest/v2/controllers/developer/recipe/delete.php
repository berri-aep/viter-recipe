<?php
$conn = null;
$conn = checkDbConnection();
$recipe = new Recipe($conn);
// $error = [];
// $returnData = [];
if (array_key_exists("recipeid", $_GET)) {
    $recipe->recipe_aid = $_GET['recipeid'];
    checkId($recipe->recipe_aid);
    // isAssociated($recipe);
    $query = checkDelete($recipe);
    returnSuccess($recipe, "recipe", $query);
}

checkEndpoint();