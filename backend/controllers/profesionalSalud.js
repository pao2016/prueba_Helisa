const { response } = require('express');
const ProfesionalSalud  = require('../models/profesionalSalud');


const obtenerProfesionalesSalud = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        ProfesionalSalud.countDocuments(query),
        ProfesionalSalud.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        productos
    });
}

const obtenerProfesionalSalud = async(req, res = response ) => {

    const { id } = req.params;
    const profesionalSalud = await ProfesionalSalud.findById( id )
                            .populate('especialidad', 'nombre')
                            

    res.json( profesionalSalud );

}

const crearProfesionalSalud = async(req, res = response ) => {

    const { estado, ...body } = req.body;

    const ProfesionalSaludDB = await ProfesionalSalud.findOne({ nombre: body.nombre });

    if ( ProfesionalSaludDB ) {
        return res.status(400).json({
            msg: `El Profesional Salud ${ ProfesionalSaludDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase()
    }

    const profesionalSalud = new ProfesionalSalud( data );

    // Guardar DB
    await profesionalSalud.save();

    res.status(201).json(profesionalSalud);

}

const actualizarProfesionalSalud = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, especialidad, ...data } = req.body;

    if( data.nombre ) {
        data.nombre  = data.nombre.toUpperCase();
    }


    const profesionalSalud = await ProfesionalSalud.findByIdAndUpdate(id, data, { new: true });

    res.json( profesionalSalud );

}

const borrarProfesionalSalud= async(req, res = response ) => {

    const { id } = req.params;
    const ProfesionalSaludBorrado = await Producto.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( ProfesionalSaludBorrado );
}




module.exports = {
    crearProfesionalSalud,
    obtenerProfesionalSalud,
    obtenerProfesionalesSalud,
    actualizarProfesionalSalud,
    borrarProfesionalSalud
}