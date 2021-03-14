const { response } = require('express');
const Cita  = require('../models/citas');


const obtenerCitas = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, citas ] = await Promise.all([
        Cita.countDocuments(query),
        Cita.find(query)
            .populate('ProfesionalSalud', 'nombre')
            .populate('Paciente', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        citas
    });
}

const obtenerCita = async(req, res = response ) => {

    const { id } = req.params;
    const cita= await Cita.findById( id )
                            .populate('ProfesionalSalud', 'nombre')
                            .populate('Paciente', 'nombre')
                            

    res.json( cita );

}

const crearCita = async(req, res = response ) => {
   

    const { estado, ...body } = req.body;
    const fecha =  Date(body.fecha);
    const citaDB = await Cita.findOne({ nombre: body.nombre });

    if ( citaDB ) {
        return res.status(400).json({
            msg: `El Profesional Salud ${ citaDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        fecha :  fecha
    }

    const cita = new Cita( data );

    // Guardar DB
    await cita.save();

    res.status(201).json(cita);

}

const actualizarCita = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, ...data } = req.body;

    if( data.nombre ) {
        data.nombre  = data.nombre.toUpperCase();
    }


    const cita = await Cita.findByIdAndUpdate(id, data, { new: true });

    res.json( cita );

}

const borrarCita= async(req, res = response ) => {

    const { id } = req.params;
    const citaBorrado = await Cita.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( citaBorrado );
}




module.exports = {
    crearCita,
    obtenerCitas,
    obtenerCita,
    actualizarCita,
    borrarCita
}