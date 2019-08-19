const express = require('express');
const mongoose = require('mongoose');
require('./db/mongo');
const app = express()

mongoose.connect('mongodb://localhost/recargasdb', {useNewUrlParser: true});







app.get('/', function (req, res) {
    res.send('Hello World')
  });
   
  app.listen(3000);