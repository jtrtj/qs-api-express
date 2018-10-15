const express = require('express')
const app = express()
const apiRoute = require('./routes/api')

app.use('/api', apiRoute)

app.listen('3000')