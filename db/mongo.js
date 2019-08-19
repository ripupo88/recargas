const Usuario = require('../esquema/usuario');

let usuario = new Usuario({
    nombre: 'richi',
    creado_por: 'pupito',
    role:'CREADOR'
});

usuario.save((err, resBD) => {
    if (err) {
        console.log(err);   
    } else {
        console.log(resBD);
    }
});