const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const  Cita  = require('../models/citas');

const coleccionesPermitidas = [
    'Cita',
    'Paciente',
    'ProfesionalSalud',
    'ExamenClinico',
    'Control'
];


const buscarCita = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino );  

    if ( esMongoID ) {
        const cita = await Cita.findById(termino)
                            .populate('profesionalSalud','nombre')
                            .populate('paciente','nombre');
        return res.json({
            results: ( cita ) ? [ cita ] : []
        });
    }

  console.log("termino", {Cita})
    const citas = await Cita.paciente.find({ nombre: termino });

    res.json({
        results: citas
    });

}



const buscar = ( req, res = response ) => {
    
    const { coleccion, termino  } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'Cita':
            buscarCita(termino, res);
        break;
        
        default:
            res.status(500).json({
                msg: 'No existe la consulta'
            })
    }

}



module.exports = {
    buscar
}