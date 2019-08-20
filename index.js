// importaciones
const express = require('express');
const mongoose = require('mongoose');
//require('./db/mongo');
const escucha = require('./correo/escuchando');

//iniciando express
const app = express();


// conectando mongoose
mongoose.connect('mongodb://localhost/recargasdb', { useNewUrlParser: true });

function textoRecibido(text) {
    console.log(text);
}




//escuchando puerto express 
app.get('/', function(req, res) {
    res.send('Hello World')
});

app.listen(3000);