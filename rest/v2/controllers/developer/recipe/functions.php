<?php

// Read all by category
function checkReadAllByCategoryId($object)
{
    $query = $object->readAllByCategoryId();
    checkQuery($query, "Empty records. (read All by category)");
    return $query;
}

// Read active
function checkFilterActive($object)
{
    $query = $object->filterActive();
    checkQuery($query, "Empty records. (filter active)");
    return $query;
}

// Read active
function checkFilterActiveSearch($object)
{
    $query = $object->filterActiveSearch();
    checkQuery($query, "Empty records. (filter active search)");
    return $query;
}
