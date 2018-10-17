const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../knexfile")[environment];
const database = require("knex")(configuration);

router.get("/", (req, res) => {
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

router.get("/:food_id", (req, res) => {
  database
    .whereIn("id", [req.params.food_id])
    .first()
    .from("foods")
    .then(food => {
      res.status(200).json({
        id: food.id,
        name: food.name,
        calories: food.calories
      });
    })
    .catch(error => {
      res.status(404).json({ error });
    });
});

router.post("/", (req, res) => {
  let newFood = req.body.food;
  for (let requiredParameter of ["name", "calories"]) {
    if (!newFood[requiredParameter]) {
      return res.status(400).json({
        error: `Expected format: { name: <string>, calories: <integer> }. You are missing a "${requiredParameter} property."`
      });
    }
  }
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
      res.status(500).json({ error });
    });
});

router.put("/:food_id", (req, res) => {
  let foodToUpdateFood = req.body.food;
  for (let requiredParameter of ["name", "calories"]) {
    if (!foodToUpdateFood[requiredParameter]) {
      return res.status(400).json({
        error: `Expected format: { name: <string>, calories: <integer> }. You are missing a "${requiredParameter} property."`
      });
    }
  }
  database("foods")
    .where({ id: req.params.food_id })
    .update(req.body.food)
    .returning("*")
    .then(updatedFood => {
      res.status(200).json({
        id: updatedFood[0].id,
        name: updatedFood[0].name,
        calories: updatedFood[0].calories
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

router.delete("/:food_id", (req, res) => {
  const foodID = parseInt(req.params.food_id);
  database("foods")
    .where("id", foodID)
    .del()
    .then(result => {
      if (result) {
        res.status(204).json({
          status: "success"
        });
      } else {
        res.status(404).json();
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports = router;
