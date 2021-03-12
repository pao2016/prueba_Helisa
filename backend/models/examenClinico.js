
const { Schema, model } = require('mongoose');

const ExamenClinicoSchema = Schema({
    
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatorria'],
        unique: true
    },

    cita: {
        type: Schema.Types.ObjectId,
        ref: 'Cita',
        required: true
    },


   
});



ExamenClinicoSchema.methods.toJSON = function() {
    const { __v, nombre, ...examenClinico  } = this.toObject();
    return examenClinico;
}

module.exports = model( 'ExamenClinico', ExamenClinicoSchema );