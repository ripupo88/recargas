let mongo = require('../db/mongo');
let enviar = require('../correo/enviando');

//comando para crear nuevo usuario en la DB
let crear = (user, data) => {

    //dividimos el texto para obtener la informacion
    let res = data.text.split(" ");

    //validamos  correo
    let regCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/ig;
    let resultCorreo = regCorreo.exec(res[1]);

    //validamos nombre
    let regNombre = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+)?$/ig;
    let resultNombre = regNombre.exec(res[2]);

    //validamos el limite
    let regLimite = /^(\d{1,2})$/ig;
    let resultLimite = regLimite.exec(res[3]);

    //si estan correctas las 3 cosas
    if (resultCorreo != null && resultNombre != null && resultLimite != null) {
        //comprobamos privilejios
        if (user[0].role == 'CREADOR' || user[0].role == 'ADMIN_ROLE') {


            //si existen privilegios, creamos el objeto con el usuario
            let comandoCrear = {
                creado_por: user[0]._id,
                correos: { correo: resultCorreo[0] },
                nombre: resultNombre[0],
                limite: resultLimite[0]
            }

            //enviamos la orden de crear el nuevo usuario
            mongo.fcrearusuario(comandoCrear, data.from)
                .then(res_mongo => {
                    console.log(res_mongo);
                    let text = "el usuario " + resultCorreo[0] + " ha sido creado";
                    let correo = {
                        to: data.from,
                        subject: "Usuario creado con exito",
                        text
                    }
                    enviar.main(correo);
                })
                .catch(err_mongo => {
                    if (err_mongo == 11000) {
                        let text = "el usuario " + resultCorreo[0] + " YA EXISTE";
                        let correo = {
                            to: data.from,
                            subject: "ERROR usuario NO creado",
                            text
                        }
                        enviar.main(correo);
                    } else {
                        let text = "el usuario " + resultCorreo[0] + " no se ha creado\nerror de base de datos";
                        let correo = {
                            to: data.from,
                            subject: "ERROR usuario NO creado",
                            text
                        }
                        enviar.main(correo);
                    }
                })


        } else {
            //si no tienes privilegio: correo con error
            let correo = {
                to: data.from,
                subject: "No eres Admin",
                text: "No cuentas con privilegios suficientes para realizar esta aciion"
            }
            enviar.main(correo);
        }
    } else {
        //si hay error de escritura en los campos del usuario
        let correo = {
            to: data.from,
            subject: "Error de sintaxis",
            text: "Hay algo mal escrito en su comando. Revice que su comando tenga la siguiente forma\n/crear ejemplo@nauta.cu Nombre 20"
        }
        enviar.main(correo);
    }

}

module.exports = { crear };