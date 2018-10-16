const express = require("express");
const foodsRoute = require("./foods");
const mealsRoute = require("./meals");
const router = express.Router();

router.use("/foods", foodsRoute);

router.use("/meals", mealsRoute);

module.exports = router;
