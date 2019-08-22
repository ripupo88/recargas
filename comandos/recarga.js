const enviar = require('../correo/enviando');
const request = require('request');

let recarga = (user, data) => {
    //transformando data en texto para analizar
    let text_from_data = data.text;

    //comprobamos que no exista ningún numero de 8 digitos
    let reg_numeros_incorrectos = /5\d{8,}/ig;
    let resultNumeroMal = reg_numeros_incorrectos.exec(text_from_data);

    //si no existen numeros erroneos procedemos a sacar los corrrectos
    if (resultNumeroMal == null) {

        let reg_numeros_correctos = /5\d{7}/ig;
        let resultNumero = text_from_data.match(reg_numeros_correctos);

        //si hay algún numero correcto
        if (resultNumero) {

            resultNumero.forEach((value, index) => {

                procesando_la_recarga(value)
                    .then(data => {
                        console.log(data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            });
        } else {

            //si no hay numero correcto
            let correo = {
                to: data.from,
                subject: "Ningun numero",
                text: "el comando /recarga requiere al menos un numero para recargar"
            }
            enviar.main(correo);
        }

    } else {
        let correo = {
            to: data.from,
            subject: "Error en un numero",
            text: "Existe al menos un numero erroneo, debe repetir el mensaje completo para realizar la recarga"
        }
        enviar.main(correo);
    }
}


let procesando_la_recarga = (resultNumero) => {
    return new Promise((resolve, reject) => {

        var result_de_recarga = [];

        /**
         * inicio de los datos para el request
         */
        var postData = {
            "SkuCode": "CU_CU_TopUp",
            "SendValue": 20,
            "SendCurrencyIso": "USD",
            "AccountNumber": "5300000000",
            "DistributorRef": "appnode",
            "ValidateOnly": false
        };

        var url = 'https://api.dingconnect.com/api/V1/SendTransfer';

        var options = {
            method: 'post',
            headers: { 'api_key': 'AhaQErYOEGf5aFIwUQBPOO' },
            body: postData,
            json: true,
            url: url
        };
        request(options, function(err, res, body) {
            if (err) {
                reject('error posting json: ', err)
                throw err
            }
            // result_de_recarga.push(index + body);
            resolve(body);
        });

    });

}

module.exports = { recarga };