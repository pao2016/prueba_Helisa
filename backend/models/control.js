
const { Schema, model } = require('mongoose');

const ControlSchema = Schema({
    
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



ControlSchema.methods.toJSON = function() {
    const { __v, nombre, ...control  } = this.toObject();
    return control;
}

module.exports = model( 'Control', ControlSchema );