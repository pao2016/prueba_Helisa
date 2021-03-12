const { Schema, model } = require('mongoose');

const EspecialidadSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
   
});


EspecialidadSchema.methods.toJSON = function() {
    const { __v, estado, ...especialidad  } = this.toObject();
    return especialidad;
}


module.exports = model( 'Especialidad', EspecialidadSchema );
