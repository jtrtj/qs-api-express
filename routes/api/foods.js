const express = require("express");
const router = express.Router();
// const db = require("../../db");
const environment = process.env.NODE_ENV || "development";
const configuration = require("../../knexfile")[environment];
const database = require("knex")(configuration);

router.get("/", function(req, res) {
  database
    .select()
    .from("foods")
    .then(function(data) {
      res.send(data);
    });
});

router.get("/:id", function(req, res) {
  database
    .whereIn("id", [req.params.id])
    .from("foods")
    .then(function(data) {
      res.send(data);
    });
});

router.post("/", function(req, res) {
  let newFood = req.body.food;
  database
    .insert(newFood)
    .returning("*")
    .into("foods")
    .then(function(data) {
      res.send(data);
    });
});

module.exports = router;
