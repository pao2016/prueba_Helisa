const { response } = require('express');
const Control  = require('../models/control');


const obtenerControles= async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, controles ] = await Promise.all([
        Control.countDocuments(query),
        Control.find(query)
            .populate('Cita', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        controles
    });
}

const obtenerControl = async(req, res = response ) => {

    const { id } = req.params;
    const control= await Control.findById( id )
                             .populate('Cita', 'nombre')
                            

    res.json( control );

}

const crearControl = async(req, res = response ) => {
   

    const { estado, ...body } = req.body;
    const fecha =  Date(body.fecha);
    const controlDB = await Control.findOne({ nombre: body.nombre });

    if ( controlDB ) {
        return res.status(400).json({
            msg: `El Profesional Salud ${ controlDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        fecha :  fecha
    }

    const control = new Control( data );

    // Guardar DB
    await control.save();

    res.status(201).json(control);

}

const actualizarControl = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, ...data } = req.body;

    if( data.nombre ) {
        data.nombre  = data.nombre.toUpperCase();
    }


    const control = await Control.findByIdAndUpdate(id, data, { new: true });

    res.json( control );

}

const borrarControl= async(req, res = response ) => {

    const { id } = req.params;
    const controlBorrado = await Control.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( controlBorrado );
}




module.exports = {
    crearControl,
    obtenerControles,
    obtenerControl,
    actualizarControl,
    borrarControl
}