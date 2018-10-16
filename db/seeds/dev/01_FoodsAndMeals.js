const foods = require("../foods");
const meals = require("../meals");

exports.seed = function(knex, Promise) {
  return knex.raw("TRUNCATE foods RESTART IDENTITY CASCADE").then(function() {
    return Promise.all([knex("foods").insert(foods)]);
  });
};

exports.seed = function(knex, Promise) {
  return knex.raw("TRUNCATE meals RESTART IDENTITY CASCADE").then(function() {
    return Promise.all([knex("meals").insert(meals)]);
  });
};
