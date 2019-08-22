const mongo = require('../db/mongo');
const crear = require('./crear');
const enviar = require('../correo/enviando');
const recarga = require('./recarga');

//funcion para verificar si el usuario que manda el comando existe 
let leerComando = (data) => {
    //se envia a mongo para saber si existe el usuario
    mongo.confirmacion(data.from)
        //si la respuesta es positiva se procesará el comando
        .then(user => {
            identificar(user, data);
        })
        //si la respuesta es negativa se envia un correo advitiendo
        .catch(e => {
            /*
             * Aquí hay que mandar un correo para decir que el susario no existe
             * y que si considera que es un error se ponga en contacto con el admin
             */
            console.log(e);
        });
}

//sacar la primera palabla para saber el comando
let identificar = (user, data) => {
    let re = /^\/[a-z]*/ig;
    let result = re.exec(data.text);
    if (!result) {
        let correo = {
            to: data.from,
            subject: "Ningún comando enviado",
            text: "No hemos recibido nungún comando. Recuerde que la sintaxis de un comando es < /comando >. Si necesita ayuda envíe el comando /ayuda"
        }
        enviar.main(correo);
    } else {

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