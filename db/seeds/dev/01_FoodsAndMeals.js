const foods = require("../foods");
const meals = require("../meals");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE foods RESTART IDENTITY CASCADE").then(function() {
    return Promise.all([
      // Inserts seed entries
      knex("foods").insert(foods)
    ]);
  });
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE meals RESTART IDENTITY CASCADE").then(function() {
    return Promise.all([
      // Inserts seed entries
      knex("meals").insert(meals)
    ]);
  });
};
