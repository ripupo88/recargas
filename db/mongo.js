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

            // si existe algun error de coneccion con la base de datos
            if (err) {
                //enviar correo con la informacion del error a la DB
                let correo = {
                    to: data,
                    subject: "Error de coneccion",
                    text: "No se puede acceder a la base de datos en este momento"
                };
                enviando.main(correo);
                reject(err);
            }
            //si se encuentra un resultado: enviar el usuario encontrado
            if (resDB.length > 0) {
                resolve(resDB);
            } else {
                //si no se encuentra un usuario: enviar correo y error
                let correo = {
                    to: data,
                    subject: "Error de registro",
                    text: "Su comando no puede ser procesado porque su correo no aparece en nuestra base de datos\ncontacte con el administrador del sistema en esta direccion de correo ripupo88@gmail.com"
                };
                enviando.main(correo);
                reject(err);
            }
        });
    })
}

let fcrearusuario = (data, mail) => {
    return new Promise((resolve, reject) => {

        let usuario = new Usuario(data);

        usuario.save((err, resBD) => {
            if (err) {
                reject(err.code);
            } else {
                resolve(resBD);
            }
        });
    });
}

module.exports = {
    confirmacion,
    fcrearusuario
};