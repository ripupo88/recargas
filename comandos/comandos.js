const basedatos = require('../db/mongo');

//funcion para verificar si el usuario que manda el comando existe 
let leerComando = (data) => {
    //se envia a mongo para saber si existe el usuario
    basedatos.confirmacion(data.from)
        //si la respuesta es positiva se procesará el comando
        .then(user => {
            identificar(user, data.text);
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
let identificar = (user, text) => {
    let re = /^\/[a-z]*/ig;
    let result = re.exec(text);

    switch (result[0]) {
        case "/crear":
            crear(user, text);
            break;
        case "valor2":
            //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
            break;
    }
}

let crear = (user, text) => {

    let res = text.split(" ");

    let regCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/ig;
    let resultCorreo = regCorreo.exec(res[1]);

    let regNombre = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+)?$/ig;
    let resultNombre = regNombre.exec(res[2]);

    let regLimite = /^(\d{1,2})$/ig;
    let resultLimite = regLimite.exec(res[3]);

    if (resultCorreo && resultNombre && resultLimite) {
        if (user[0].role == 'CREADOR' || user[0].role == 'ADMIN_ROLE') {

            let comandoCrear = {
                creado_por: user[0]._id,
                correos: { correo: resultCorreo[0] },
                nombre: resultNombre[0],
                limite: resultLimite[0]
            }
            basedatos.fcrearusuario(comandoCrear);
        } else {
            console.log('respondemos con error de datos mal escrito');
        }
    } else {
        //error de privilegios no es admin
    }

}

module.exports = { leerComando };