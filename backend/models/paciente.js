
const { Schema, model } = require('mongoose');

const PacienteSchema = Schema({
    
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    identificacion: {
        type: Number,
        required: [true, 'La identificacion es obligatorria'],
        unique: true
    },
   
    estado: {
        type: Boolean,
        default: true
    },
  
});



PacienteSchema.methods.toJSON = function() {
    const { __v, identificacion, ...paciente  } = this.toObject();
    return paciente;
}

module.exports = model( 'Paciente', PacienteSchema );