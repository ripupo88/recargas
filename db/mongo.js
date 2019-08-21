const Usuario = require('../esquema/usuario');




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