const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    database: "quantified_self_express"
  }
});

module.exports = knex;
