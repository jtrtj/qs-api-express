const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", function(req, res) {
  db.select().from("");
});

module.exports = router;
