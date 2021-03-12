
const { Schema, model } = require('mongoose');

const ProfesionalSaludSchema = Schema({
    
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    identificacion: {
        type: Number,
        required: [true, 'La identificacion es obligatorria'],
        unique: true
    },
    nroTarjeta: {
        type: Number,
        required: [true, 'El numero de la tarjeta profesional es obligatoria'],
    },

    tipo: {
        type: String,
        required: true,
        emun: ['MEDICO', 'ENFERMERA']
    },
    estado: {
        type: Boolean,
        default: true
    },
   
});



UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario  } = this.toObject();
    return usuario;
}

module.exports = model( 'ProfesionalSalud', ProfesionalSaludSchema );