const mongoose = require('mongoose');

let Schema = mongoose.Schema;

//var regCorreo = '/([\\w-+]+(?:\\.[\\w-+]+)*@(?:[\\w-]+\\.)+[a-zA-Z]{2,7})/';
var regNumero = '/(5\d{7})/';

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE', 'CREADOR'],
    message: `{VALUE} no es un rol válido`
}

let origenesValidos = {
    values: ['telegram', 'correo'],
    message: `{VALUE} no es un origen valido`
}

let usuarioSchema = new Schema({
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    nombre: { type: String, required: true },
    correos: [{
        correo: { type: String, unique: true }, //match: regCorreo
        activo: { type: Boolean, default: true, index: true }
    }],
    telegram_id: { type: Number },
    creado_por: { type: String, required: true },
    limite: { type: Number },
    activo: { type: Boolean, default: true },
    historial: [{
        numero: { type: Number, match: regNumero },
        repetir: { type: Boolean },
        recargas: [{
            fecha: { type: Date, default: Date.now },
            origen: { type: String, enum: origenesValidos },
            ok: { type: Boolean }
        }]
    }]
});

module.exports = mongoose.model('usuarioDB', usuarioSchema);