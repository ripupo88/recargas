let mongo = require('../db/mongo');
let enviar = require('../correo/enviando');
let crear = (user, data) => {

    let res = data.text.split(" ");

    let regCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/ig;
    let resultCorreo = regCorreo.exec(res[1]);

    let regNombre = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+)?$/ig;
    let resultNombre = regNombre.exec(res[2]);

    let regLimite = /^(\d{1,2})$/ig;
    let resultLimite = regLimite.exec(res[3]);

    if (resultCorreo != null && resultNombre != null && resultLimite != null) {
        if (user[0].role == 'CREADOR' || user[0].role == 'ADMIN_ROLE') {

            let comandoCrear = {
                creado_por: user[0]._id,
                correos: { correo: resultCorreo[0] },
                nombre: resultNombre[0],
                limite: resultLimite[0]
            }
            mongo.fcrearusuario(comandoCrear);
        } else {
            let correo = {
                to: data.from,
                subject: "No eres Admin",
                text: "No cuentas con privilegios suficientes para realizar esta aciion"
            }
            enviar.main(correo);
        }
    } else {
        let correo = {
            to: data.from,
            subject: "Error de sintaxis",
            text: "Hay algo mal escrito en su comando. Revice que su comando tenga la siguiente forma\n/crear ejemplo@nauta.cu Nombre 20"
        }
        enviar.main(correo);
    }

}

module.exports = { crear };