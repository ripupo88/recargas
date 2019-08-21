const Usuario = require('../esquema/usuario');

let usuario = new Usuario({
    "role": "CREADOR",
    "activo": true,
    "nombre": "Richar",
    "creado_por": "5d5b3c0bab9c63134c4917d2",
    "correos": [{
        "correo": "ripupo88@gmail.com"
    }],
    "historial": [],
    "__v": 0
});

usuario.save((err, resBD) => {
    if (err) {
        console.log(err);
    } else {
        console.log(resBD);
    }
});


function confirmacion(data) {
    return new Promise(function(resolve, reject) {
        Usuario.find({ 'correos.correo': data }, (err, resDB) => {
            if (resDB.length > 0) {
                resolve(resDB);
            } else {
                reject('elusuario no existe en la base de datos');
            }
        });
    })
}

let fcrearusuario = (data) => {

    let usuario = new Usuario(data);

    usuario.save((err, resBD) => {
        if (err) {
            console.log(err);
        } else {
            console.log(resBD);
        }
    });
}

module.exports = {
    confirmacion,
    fcrearusuario
};