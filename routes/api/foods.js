const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../knexfile")[environment];
const database = require("knex")(configuration);

router.get("/", function(req, res) {
  database
    .select()
    .from("foods")
    .then(foods => {
      res.status(200).json(foods);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

router.get("/:id", function(req, res) {
  database
    .whereIn("id", [req.params.id])
    .first()
    .from("foods")
    .then(food => {
      res.status(200).json(food);
    })
    .catch(error => {
      res.status(404).json({ error });
    });
});

router.post("/", function(req, res) {
  let newFood = req.body.food;
  database
    .insert(newFood)
    .returning("*")
    .into("foods")
    .then(food => {
      res.status(201).json({
        id: food[0].id,
        name: food[0].name,
        calories: food[0].calories
      });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

module.exports = router;
