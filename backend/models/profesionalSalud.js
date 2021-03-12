
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
    especialidad: {
        type: Schema.Types.ObjectId,
        ref: 'Especialidad',
        required: true
    },
   
});



ProfesionalSaludSchema.methods.toJSON = function() {
    const { __v, identificacion, ...profesionaSalud  } = this.toObject();
    return profesionaSalud;
}

module.exports = model( 'ProfesionalSalud', ProfesionalSaludSchema );