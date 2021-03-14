const { response } = require('express');
const ExamenClinico  = require('../models/examenClinico');


const obtenerExamenesClinico = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, examenClinico ] = await Promise.all([
        ExamenClinico.countDocuments(query),
        ExamenClinico.find(query)
            .populate('Cita', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        examenClinico
    });
}

const obtenerExamenClinico = async(req, res = response ) => {

    const { id } = req.params;
    const examenClinico= await ExamenClinico.findById( id )
                             .populate('Cita', 'nombre')
                            

    res.json( examenClinico );

}

const crearExamenClinico = async(req, res = response ) => {
   

    const { estado, ...body } = req.body;
    const fecha =  Date(body.fecha);
    const examenClinicoDB = await ExamenClinico.findOne({ nombre: body.nombre });

    if ( examenClinicoDB ) {
        return res.status(400).json({
            msg: `El Profesional Salud ${ examenClinicoDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        fecha :  fecha
    }

    const examenClinico = new ExamenClinico( data );

    // Guardar DB
    await examenClinico.save();

    res.status(201).json(examenClinico);

}

const actualizarExamenClinico = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, ...data } = req.body;

    if( data.nombre ) {
        data.nombre  = data.nombre.toUpperCase();
    }


    const examenClinico= await ExamenClinico.findByIdAndUpdate(id, data, { new: true });

    res.json( examenClinico );

}

const borrarExamenClinico= async(req, res = response ) => {

    const { id } = req.params;
    const examenClinicoBorrado = await ExamenClinico.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( examenClinicoBorrado );
}




module.exports = {
    crearExamenClinico,
    obtenerExamenesClinico,
    obtenerExamenClinico,
    actualizarExamenClinico,
    borrarExamenClinico
}