const express = require("express");
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../knexfile")[environment];
const database = require("knex")(configuration);
const query_all = `SELECT meals.id, meals.name, array_to_json
       (array_agg(json_build_object('id', foods.id, 'name', foods.name, 'calories', foods.calories)))
       AS foods
       FROM meals
       JOIN meal_foods ON meals.id = meal_foods.meal_id
       JOIN foods ON meal_foods.food_id = foods.id
       GROUP BY meals.id`;

router.get("/", (req, res) => {
  return database
    .raw(query_all)
    .then(rows => {
      res.status(200).json(rows.rows);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

const getSingle = meal_id => {
  return database.raw(`SELECT meals.id, meals.name, array_to_json
             (array_agg(json_build_object('id', foods.id, 'name', foods.name, 'calories', foods.calories)))
             AS foods
             FROM meals
             JOIN meal_foods ON meals.id = meal_foods.meal_id
             JOIN foods ON meal_foods.food_id = foods.id
             WHERE meals.id = ${meal_id}
             GROUP BY meals.id`);
};

router.get("/:meal_id/foods", (req, res) => {
  found_meal = getSingle(req.params.meal_id)
    .then(found_meal => {
      res.status(200).json(found_meal.rows);
    })
    .catch(error => {
      res.status(500).json({ error });
      console.log({ error });
    });
});

router.post("/:meal_id/foods/:food_id", (req, res) => {
  const food = req.body;
  food["meal_id"] = req.params.meal_id;
  food["food_id"] = req.params.food_id;
  for (let requiredParameter of ["meal_id"]) {
    if (!food[requiredParameter]) {
      return res
        .status(422)
        .send({
          error: `Expected format: { note: <String> }. You're missing a "${requiredParameter}" property.`
        });
    }
  }
  database("meal_foods")
    .insert(food)
    .returning("*")
    .then(food => {
      res.status(201).json(food);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

router.delete("/:meal_id/foods/:food_id", (req, res) => {
  mealId = req.params.meal_id;
  foodId = req.params.food_id;
  database.raw();
  // database('meal_foods')
  // .where(`meal_id: ${mealId}`)
  // .where(`food_id: ${foodId}`)
  // .del()
  // .then(res.status(204).send('You are the best'));
});

module.exports = router;
