const express = require('express')
const router = express.Router()
const foodsRoute = require('./foods')

router.use('/foods', foodsRoute)

module.exports = router