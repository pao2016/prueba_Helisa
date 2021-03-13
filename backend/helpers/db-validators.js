const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Especialidad = require('../models/especialidad');
const profesionalSalud = require('../models/profesionalSalud');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeEspecialidadPorId = async( id ) => {

    const existeEspecialidad = await Especialidad.findById(id);
    if ( !existeEspecialidad ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeProfesionalSaludPorId = async( id ) => {

    const existeProfesionalSalud = await profesionalSalud.findById(id);
    if ( !existeProfesionalSalud ) {
        throw new Error(`El id no existe ${ id }`);
    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeEspecialidadPorId,
    existeProfesionalSaludPorId
}

