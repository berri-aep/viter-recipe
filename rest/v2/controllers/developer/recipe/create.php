<?php
$conn = null;
$conn = checkDbConnection();
$recipe = new Recipe($conn);

if (array_key_exists("recipeid", $_GET)) {
    checkEndpoint();
} 

checkPayload($data);

$recipe->recipe_title = checkIndex($data, "recipe_title");
$recipe->recipe_category_id = checkIndex($data, "recipe_category_id");
$recipe->recipe_level_id = checkIndex($data, "recipe_level_id");
$recipe->recipe_serving = checkIndex($data, "recipe_serving");
$recipe->recipe_prep_time = checkIndex($data, "recipe_prep_time");
$recipe->recipe_image = checkIndex($data, "recipe_image");
$recipe->recipe_ingredients = json_encode($data["recipe_ingredients"]);
$recipe->recipe_description = checkIndex($data, "recipe_description");
$recipe->recipe_instruction = checkIndex($data, "recipe_instruction");

$recipe->recipe_is_active = 1;
$recipe->recipe_created = date("Y-m-d H:i:s");
$recipe->recipe_datetime = date("Y-m-d H:i:s");

// isNameExist($recipe, $recipe->recipe_title);

$query = checkCreate($recipe);
returnSuccess($recipe, "recipe", $query);