const foods = require("../foods");

exports.seed = function(knex, Promise) {
  return knex.raw("TRUNCATE foods RESTART IDENTITY CASCADE").then(function() {
    return Promise.all([knex("foods").insert(foods)]);
  });
};
