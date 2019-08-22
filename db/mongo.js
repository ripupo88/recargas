const Usuario = require('../esquema/usuario');
const enviando = require('../correo/enviando');

let creador = () => {
    Usuario.find({ 'correos.correo': data }, (err, resDB) => {
        if (!resDB) {

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
        }
    });
}


function confirmacion(data) {
    return new Promise(function(resolve, reject) {
        Usuario.find({ 'correos.correo': data }, (err, resDB) => {
            if (resDB.length > 0) {
                resolve(resDB);
            } else {
                let correo = {
                    to: data,
                    subject: "error",
                    text: "Su comando no puede ser procesado porque su correo no aparece en nuestra base de datos\ncontacte con el administrador del sistema en esta direccion de correo ripupo88@gmail.com"
                };
                enviando.main(correo);
                reject(data);
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