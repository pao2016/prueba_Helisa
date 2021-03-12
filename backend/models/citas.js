
const { Schema, model } = require('mongoose');

const CitaSchema = Schema({
    
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatorria'],
        unique: true
    },

    estado: {
        type: Boolean,
        default: true
    },

    profesionalSalud: {
        type: Schema.Types.ObjectId,
        ref: 'ProfesionalSalud',
        required: true
    },

    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
   
});



CitaSchema.methods.toJSON = function() {
    const { __v, nombre, ...cita  } = this.toObject();
    return cita;
}

module.exports = model( 'Cita', CitaSchema );