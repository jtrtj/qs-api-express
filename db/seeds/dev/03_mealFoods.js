const mealFoods = require("../mealFoods");

exports.seed = function(knex, Promise) {
  return knex
    .raw("TRUNCATE meal_foods RESTART IDENTITY CASCADE")
    .then(function() {
      return Promise.all([knex("meal_foods").insert(mealFoods)])
        .then(() => console.log("MealFoods seeded."))
        .catch(error => console.log(`Error Seeding MealFoods! ${error}`));
    })
    .catch(error => console.log(`Error Seeding MealFoods! ${error}`));
};
