const express = require('express')
const app = express()

app.listen('3000')

app.get('/', function(req, res){
  res.send('HELLO WORLD!')
})