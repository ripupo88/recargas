const mongo = require('../db/mongo'); //base de datos
const crear = require('./crear'); //comando crear
const enviar = require('../correo/enviando'); //envíos de correos
const recarga = require('./recarga'); //comando recarga

//funcion para verificar si el usuario que manda el comando existe 
let leerComando = (data) => {
    //se envia a mongo para saber si existe el usuario
    mongo.confirmacion(data.from)
        //si la respuesta es positiva se procesará el comando
        .then(user => {
            identifica_comando(user, data);
        })
        //si la respuesta es negativa se envia un correo advitiendo
        .catch(e => {
            //terminar la ejecucion
            return console.log(e);
        });
}

//sacar la primera palabla para saber el comando
let identifica_comando = (user, data) => {
    let re = /^\/[a-z]*/ig;
    let result = re.exec(data.text);
    //si no se encuentra ningun comando
    if (!result) {
        let correo = {
            to: data.from,
            subject: "Ningún comando enviado",
            text: "No hemos recibido nungún comando. Recuerde que la sintaxis de un comando es < /comando >. Si necesita ayuda envíe el comando /ayuda"
        }
        enviar.main(correo);
    } else {
        //proseso de saber cual es el comando
        switch (result[0]) {

            case "/crear":
                crear.crear(user, data);
                break;

            case "/recarga":
                recarga.recarga(user, data);
                break;

            default:
                let correo = {
                    to: data.from,
                    subject: "Comando no encontrado",
                    text: "Por favor, revise que su comnado esté bien escrito e intentelo de nuevo. Tambien puede consultar la ayuda con el comando /ayuda"
                }
                enviar.main(correo);
                break;

        }
    }
}
module.exports = { leerComando };