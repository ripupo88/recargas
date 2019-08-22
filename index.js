// importaciones
const express = require('express');
const mongoose = require('mongoose');
//require('./db/mongo');
const escucha = require('./correo/escuchando');
const comandos = require('./comandos/comandos');

//iniciando express
const app = express();

// escuchando nuevos correos
escucha.newmail.on('correo', data => {
    // se envia la iformacion para ser procesada en comandos
    comandos.leerComando(data);
});


// conectando mongoose
mongoose.connect('mongodb://localhost/recargasdb', { useNewUrlParser: true });

//escuchando puerto express 
app.get('/', function(req, res) {
    res.send('Hello World');
});

app.listen(3000);