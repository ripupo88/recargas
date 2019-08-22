let recarga = (user, data) => {
    let text = data.text + " ";
    let regNumero = /5\d{7}/ig;
    let resultNumero = regNumero.exec(text);

    console.log(resultNumero);

}

module.exports = { recarga };