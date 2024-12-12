<?php
class Level
{
    public $level_aid;
    public $level_is_active;
    public $level_title;
    public $level_datetime;
    public $level_created;

    public $connection;
    public $lastInsertedId;

    public $tbllevel;

    public $level_start;
    public $level_total;
    public $level_search;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tbllevel = "level";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tbllevel} ";
            $sql .= "( level_title, ";
            $sql .= "level_is_active, ";
            $sql .= "level_datetime, ";
            $sql .= "level_created ) values ( ";
            $sql .= ":level_title, ";
            $sql .= ":level_is_active, ";
            $sql .= ":level_datetime, ";
            $sql .= ":level_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "level_title" => $this->level_title,
                "level_is_active" => $this->level_is_active,
                "level_datetime" => $this->level_datetime,
                "level_created" => $this->level_created,
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
            $sql = "select * from {$this->tbllevel} ";
            $sql .= "order by level_is_active desc, ";
            $sql .= "level_title asc ";
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
            $sql = "select * from {$this->tbllevel} ";
            $sql .= "order by level_is_active desc, ";
            $sql .= "level_title asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->level_start - 1,
                "total" => $this->level_total,
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
            $sql = "select * from {$this->tbllevel} ";
            $sql .= "where level_aid  = :level_aid ";
            $sql .= "order by level_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "level_aid" => $this->level_aid,
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
            $sql = "update {$this->tbllevel} set ";
            $sql .= "level_title = :level_title, ";
            $sql .= "level_datetime = :level_datetime ";
            $sql .= "where level_aid = :level_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "level_title" => $this->level_title,
                "level_datetime" => $this->level_datetime,
                "level_aid" => $this->level_aid,
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
            $sql = "update {$this->tbllevel} set ";
            $sql .= "level_is_active = :level_is_active, ";
            $sql .= "level_datetime = :level_datetime ";
            $sql .= "where level_aid = :level_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "level_is_active" => $this->level_is_active,
                "level_datetime" => $this->level_datetime,
                "level_aid" => $this->level_aid,
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
            $sql = "delete from {$this->tbllevel} ";
            $sql .= "where level_aid = :level_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "level_aid" => $this->level_aid,
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