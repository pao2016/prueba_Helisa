const { response } = require('express');
const  Paciente  = require('../models/paciente');


const obtenerPacientes = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, pacientes ] = await Promise.all([
        Paciente.countDocuments(query),
        Paciente.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        pacientes
    });
}

const obtenerPaciente = async(req, res = response ) => {

    const { id } = req.params;
    const paciente = await Paciente.findById( id )
                         
    res.json( paciente );

}

const crearPaciente = async(req, res = response ) => {
    
    
    const { estado, ...body } = req.body;
    const nombre = req.body.nombre.toUpperCase();
   
    const pacienteDB = await Paciente.findOne({ nombre });

    if ( pacienteDB ) {
        return res.status(400).json({
            msg: `La categoria ${ pacienteDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body
    }
    const paciente = new Paciente( data );

    // Guardar DB
    await paciente.save();

    res.status(201).json(paciente);

}

const actualizarPaciente= async( req, res = response ) => {

    const { id } = req.params;
    const { estado, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();
   
    const paciente = await Paciente.findByIdAndUpdate(id, data, { new: true });

    res.json( paciente );

}

const borrarPaciente = async(req, res =response ) => {

    const { id } = req.params;
    const pacienteBorrado = await Paciente.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( pacienteBorrado );
}




module.exports = {
    crearPaciente,
    actualizarPaciente,
    borrarPaciente,
    obtenerPaciente,
    obtenerPacientes
}