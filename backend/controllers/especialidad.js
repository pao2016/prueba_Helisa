const { response } = require('express');
const { Especialidad } = require('../models');


const obtenerEspecialidades = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, especialidades ] = await Promise.all([
        Especialidad.countDocuments(query),
        Especialidad.find(query).skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        especialidades
    });
}

const obtenerEspecialidad = async(req, res = response ) => {

    const { id } = req.params;
    const especialidad = await Especialidad.findById( id )
                         
    res.json( especialidad );

}

const crearEspecialidad = async(req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const especialidadDB = await Especialidad.findOne({ nombre });

    if ( especialidadDB ) {
        return res.status(400).json({
            msg: `La categoria ${ especialidadDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre
    }

    const especialidad = new Especialidad( data );

    // Guardar DB
    await especialidad.save();

    res.status(201).json(especialidad);

}

const actualizarEspecialidad = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();
   
    const especialidad = await Especialidad.findByIdAndUpdate(id, data, { new: true });

    res.json( especialidad );

}

const borrarEspecialidad = async(req, res =response ) => {

    const { id } = req.params;
    const especialidadBorrada = await Especialidad.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( especialidadBorrada );
}




module.exports = {
    crearEspecialidad,
    obtenerEspecialidades,
    obtenerEspecialidad,
    actualizarEspecialidad,
    borrarEspecialidad
}