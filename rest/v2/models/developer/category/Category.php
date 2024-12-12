<?php
class Category
{
    public $category_aid;
    public $category_is_active;
    public $category_title;
    public $category_datetime;
    public $category_created;

    public $connection;
    public $lastInsertedId;

    public $tblcategory;

    public $category_start;
    public $category_total;
    public $category_search;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblcategory = "category";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblcategory} ";
            $sql .= "( category_title, ";
            $sql .= "category_is_active, ";
            $sql .= "category_datetime, ";
            $sql .= "category_created ) values ( ";
            $sql .= ":category_title, ";
            $sql .= ":category_is_active, ";
            $sql .= ":category_datetime, ";
            $sql .= ":category_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_title" => $this->category_title,
                "category_is_active" => $this->category_is_active,
                "category_datetime" => $this->category_datetime,
                "category_created" => $this->category_created,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select * from {$this->tblcategory} ";
            $sql .= "order by category_is_active desc, ";
            $sql .= "category_title asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read limit
    public function readLimit()
    {
        try {
            $sql = "select * from {$this->tblcategory} ";
            $sql .= "order by category_is_active desc, ";
            $sql .= "category_title asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->category_start - 1,
                "total" => $this->category_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function search()
    {
        try {
            $sql = "select * from {$this->tblrecipe} ";
            $sql .= "where recipe_title like :recipe_title ";
            $sql .= "order by recipe_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "recipe_title" => "%{$this->recipe_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read by id
    public function readById()
    {
        try {
            $sql = "select * from {$this->tblcategory} ";
            $sql .= "where category_aid  = :category_aid ";
            $sql .= "order by category_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_aid" => $this->category_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

   // update
    public function update()
    {
        try {
            $sql = "update {$this->tblcategory} set ";
            $sql .= "category_title = :category_title, ";
            $sql .= "category_datetime = :category_datetime ";
            $sql .= "where category_aid = :category_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_title" => $this->category_title,
                "category_datetime" => $this->category_datetime,
                "category_aid" => $this->category_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblcategory} set ";
            $sql .= "category_is_active = :category_is_active, ";
            $sql .= "category_datetime = :category_datetime ";
            $sql .= "where category_aid = :category_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_is_active" => $this->category_is_active,
                "category_datetime" => $this->category_datetime,
                "category_aid" => $this->category_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblcategory} ";
            $sql .= "where category_aid = :category_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_aid" => $this->category_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkName()
    {
        try {
            $sql = "select recipe_title from {$this->tblrecipe} ";
            $sql .= "where recipe_title = :recipe_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "recipe_title" => "{$this->recipe_title}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // // name
    // public function checkAssociation()
    // {
    //     try {
    //         $sql = "select product_recipe_id from {$this->tblrecipe} ";
    //         $sql .= "where product_recipe_id = :product_recipe_id ";
    //         $query = $this->connection->prepare($sql);
    //         $query->execute([
    //             "product_recipe_id" => $this->recipe_aid,
    //         ]);
    //     } catch (PDOException $ex) {
    //         $query = false;
    //     }
    //     return $query;
    // }


    public function filterByStatus()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblrecipe} ";
            $sql .= "where recipe_is_active = :recipe_is_active  ";
            $sql .= "order by recipe_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "recipe_is_active" => $this->recipe_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterByStatusAndSearch()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblrecipe} ";
            $sql .= "where ";
            $sql .= "recipe_is_active = :recipe_is_active ";
            $sql .= "and recipe_title like :recipe_title ";
            $sql .= "order by recipe_is_active desc, ";
            $sql .= "recipe_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "recipe_title" => "%{$this->recipe_search}%",
                "recipe_is_active" => $this->recipe_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}