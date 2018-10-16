const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", function(req, res) {
  db.select()
    .from("foods")
    .then(function(data) {
      res.send(data);
    });
});

router.get("/:id", function(req, res) {
  db.whereIn("id", [req.params.id])
    .from("foods")
    .then(function(data) {
      res.send(data);
    });
});

module.exports = router;
